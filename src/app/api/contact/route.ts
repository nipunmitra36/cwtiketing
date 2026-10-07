import {
  CONTACT_API_BASE_URL,
  CONTACT_API_ENDPOINT,
  type ContactFieldErrors,
  type ContactPayload,
  type ContactResponse,
} from "@/lib/contact";

const UPSTREAM_TIMEOUT_MS = 12_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const GENERIC_FAILURE =
  "We couldn't deliver your message just now. Please try again in a moment, or email us directly.";

const CAPTCHA_MISSING =
  "Captcha verification is required. Please complete the verification and try again.";

const CAPTCHA_FAILED =
  "Captcha verification failed. Please try again, or email us directly.";

function upstreamUrl(): string {
  const origin = process.env.CONTACT_API_BASE_URL?.replace(/\/+$/, "") || CONTACT_API_BASE_URL;
  return `${origin}${CONTACT_API_ENDPOINT}`;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function jsonResponse(body: ContactResponse, status: number): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function parseJson(text: string): unknown {
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

/** Pull `{ errors: { field: ["msg"] } }` out of an upstream validation payload. */
function readUpstreamFieldErrors(body: unknown): Record<string, string> {
  if (typeof body !== "object" || body === null || !("errors" in body)) return {};

  const errors = (body as { errors?: unknown }).errors;
  if (typeof errors !== "object" || errors === null) return {};

  const fieldErrors: Record<string, string> = {};
  const record = errors as Record<string, unknown>;

  for (const field of Object.keys(record)) {
    const raw = record[field];
    const first = Array.isArray(raw) ? raw[0] : raw;
    if (typeof first === "string" && first.trim()) {
      fieldErrors[field] = first.trim();
    }
  }

  return fieldErrors;
}

export async function POST(request: Request): Promise<Response> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return jsonResponse({ ok: false, message: "We couldn't read that submission. Please try again." }, 400);
  }

  if (typeof raw !== "object" || raw === null) {
    return jsonResponse({ ok: false, message: "We couldn't read that submission. Please try again." }, 400);
  }

  const body = raw as Record<string, unknown>;

  // Honeypot: real users never see this input, bots usually fill it in.
  if (readString(body.fax_number)) {
    return jsonResponse({ ok: true }, 200);
  }

  // Turnstile tokens are single-use: the upstream API runs siteverify itself,
  // so verifying here as well would burn the token and make every submission fail.
  const turnstileToken = readString(body["cf-turnstile-response"]);

  const payload: ContactPayload = {
    full_name: readString(body.full_name),
    email: readString(body.email).toLowerCase(),
    topic: readString(body.topic),
    message: readString(body.message),
  };
  const website = readString(body.website);
  if (website) payload.website = website;

  const fieldErrors: ContactFieldErrors = {};
  if (!payload.full_name) fieldErrors.full_name = "Please enter your full name.";
  if (!payload.email) {
    fieldErrors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(payload.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (!payload.topic) fieldErrors.topic = "Please choose a topic.";
  if (!payload.message) fieldErrors.message = "Please tell us how we can help.";

  if (Object.keys(fieldErrors).length > 0) {
    return jsonResponse(
      { ok: false, message: "Please fix the highlighted fields and try again.", fieldErrors },
      422,
    );
  }

  // A submission without a token can never be accepted upstream — fail fast.
  if (!turnstileToken) {
    return jsonResponse({ ok: false, message: CAPTCHA_MISSING }, 400);
  }

  // The upstream endpoint only parses form-encoded bodies (a JSON body comes
  // through empty and is rejected as "all fields required").
  const upstreamForm = new URLSearchParams();
  upstreamForm.set("full_name", payload.full_name);
  upstreamForm.set("email", payload.email);
  upstreamForm.set("topic", payload.topic);
  upstreamForm.set("message", payload.message);
  upstreamForm.set("cf-turnstile-response", turnstileToken);

  // Simulate success only for local/dev when upstream cannot be reached at all.
  const shouldSimulate = process.env.NODE_ENV !== "production";

  let upstream: Response | null = null;
  try {
    upstream = await fetch(upstreamUrl(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: upstreamForm.toString(),
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (reason) {
    console.error("[contact] upstream request failed", reason);
    if (shouldSimulate) {
      return jsonResponse({ ok: true }, 200);
    }
    return jsonResponse({ ok: false, message: GENERIC_FAILURE }, 502);
  }

  const upstreamBody = parseJson(await upstream.text());

  if (upstream.ok) {
    return jsonResponse({ ok: true }, 200);
  }

  if (upstream.status === 422 || upstream.status === 400) {
    const upstreamErrors = readUpstreamFieldErrors(upstreamBody);

    if (upstreamErrors["cf-turnstile-response"]) {
      console.warn("[contact] upstream rejected the turnstile token");
      return jsonResponse({ ok: false, message: CAPTCHA_FAILED }, 400);
    }

    const fieldErrorsFromApi: ContactFieldErrors = {};
    for (const field of ["full_name", "email", "topic", "message"] as const) {
      const message = upstreamErrors[field];
      if (message) fieldErrorsFromApi[field] = message;
    }

    if (Object.keys(fieldErrorsFromApi).length > 0) {
      return jsonResponse(
        { ok: false, message: "Please fix the highlighted fields and try again.", fieldErrors: fieldErrorsFromApi },
        422,
      );
    }
  }

  if (upstream.status === 429) {
    return jsonResponse(
      { ok: false, message: "Too many messages in a short time. Please wait a minute and try again." },
      429,
    );
  }

  console.error("[contact] upstream rejected submission", {
    status: upstream.status,
    body: upstreamBody,
  });

  return jsonResponse({ ok: false, message: GENERIC_FAILURE }, 502);
}