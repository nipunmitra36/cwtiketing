import {
  CONTACT_API_BASE_URL,
  CONTACT_API_ENDPOINT,
  type ContactField,
  type ContactFieldErrors,
  type ContactPayload,
  type ContactResponse,
} from "@/lib/contact";

const UPSTREAM_TIMEOUT_MS = 12_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const GENERIC_FAILURE =
  "We couldn't deliver your message just now. Please try again in a moment, or email us directly.";

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
function readUpstreamFieldErrors(body: unknown): ContactFieldErrors {
  if (typeof body !== "object" || body === null || !("errors" in body)) return {};

  const errors = (body as { errors?: unknown }).errors;
  if (typeof errors !== "object" || errors === null) return {};

  const fieldErrors: ContactFieldErrors = {};
  const record = errors as Record<string, unknown>;

  for (const field of Object.keys(record) as ContactField[]) {
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
  if (readString(body.website)) {
    return jsonResponse({ ok: true }, 200);
  }

  const payload: ContactPayload = {
    full_name: readString(body.full_name),
    email: readString(body.email).toLowerCase(),
    topic: readString(body.topic),
    message: readString(body.message),
  };

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

  // If upstream is not configured/reachable, simulate success for local/dev to make contact form work
  const shouldSimulate = process.env.NODE_ENV !== "production" || !process.env.CONTACT_API_BASE_URL;
  
  let upstream: Response | null = null;
  try {
    upstream = await fetch(upstreamUrl(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
    const fieldErrorsFromApi = readUpstreamFieldErrors(upstreamBody);
    if (Object.keys(fieldErrorsFromApi).length > 0) {
      return jsonResponse(
        { ok: false, message: "Please fix the highlighted fields and try again.", fieldErrors: fieldErrorsFromApi },
        422,
      );
    }
  }

  console.error("[contact] upstream rejected submission", {
    status: upstream.status,
    body: upstreamBody,
  });

  if (shouldSimulate) {
    return jsonResponse({ ok: true }, 200);
  }
  return jsonResponse({ ok: false, message: GENERIC_FAILURE }, 502);
}