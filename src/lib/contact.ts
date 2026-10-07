/**
 * Contact form contract and submit helper (posts straight to the backend API).
 * Safe to import from both server and client code.
 */

import { API_BASE_URL } from "@/lib/api";

/** Backend API origin for the contacts endpoint. */
export const CONTACT_API_BASE_URL = API_BASE_URL;

/** Upstream path, relative to the origin. */
export const CONTACT_API_ENDPOINT = "/api/v1/contacts";

/** Full URL the browser form posts to (the API allows cross-origin requests). */
export const CONTACT_FORM_ENDPOINT = `${CONTACT_API_BASE_URL}${CONTACT_API_ENDPOINT}`;

/** Public Turnstile site key; the env value wins when it is set. */
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "0x4AAAAAAFO-PolDZ1EsH4bE";

export const CONTACT_TOPICS = [
  "Sales & Pricing",
  "Technical Support",
  "Book a Demo",
  "General Enquiry",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

/** Exact body shape the upstream API expects. */
export type ContactPayload = {
  full_name: string;
  email: string;
  topic: string;
  message: string;
  /** Optional — omitted from the request when left blank. */
  website?: string;
};

export type ContactField = keyof ContactPayload;

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactResponse =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: ContactFieldErrors };

/** What was sent and what came back — shown by the contact page's `?debug=1` panel. */
export type ContactDebugInfo = {
  url: string;
  payload: Record<string, string>;
  status: number | "network error";
  response: unknown;
  at: string;
};

const GENERIC_FAILURE =
  "We couldn't deliver your message just now. Please try again in a moment, or email us directly.";

/** Pull `{ errors: { field: ["msg"] } }` out of an API validation payload. */
function readFieldErrors(body: unknown): Record<string, string> {
  const errors = (body as { errors?: unknown } | null)?.errors;
  if (typeof errors !== "object" || errors === null) return {};

  const out: Record<string, string> = {};
  for (const [field, raw] of Object.entries(errors as Record<string, unknown>)) {
    const first = Array.isArray(raw) ? raw[0] : raw;
    if (typeof first === "string" && first.trim()) out[field] = first.trim();
  }
  return out;
}

/**
 * Send the contact form straight from the browser to the API. Going direct means
 * the API's own Turnstile check sees the visitor's real IP, and a server-side
 * proxy can't be blocked by Cloudflare in front of the API.
 */
export async function submitContact(
  payload: ContactPayload,
  turnstileToken: string,
  onDebug?: (info: ContactDebugInfo) => void,
): Promise<ContactResponse> {
  const requestBody = { ...payload, "cf-turnstile-response": turnstileToken };
  const debug = (status: ContactDebugInfo["status"], response: unknown) =>
    onDebug?.({
      url: CONTACT_FORM_ENDPOINT,
      payload: requestBody,
      status,
      response,
      at: new Date().toLocaleString(),
    });

  let res: Response;
  try {
    res = await fetch(CONTACT_FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
  } catch (reason) {
    debug("network error", String(reason));
    return {
      ok: false,
      message: "We couldn't reach our servers. Please check your connection and try again.",
    };
  }

  const text = await res.text().catch(() => "");
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  debug(res.status, body);

  if (res.ok) return { ok: true };

  const errors = readFieldErrors(body);

  if (errors["cf-turnstile-response"]) {
    return {
      ok: false,
      message: "Captcha verification failed. Please verify again and resubmit.",
    };
  }

  const fieldErrors: ContactFieldErrors = {};
  for (const field of ["full_name", "email", "website", "topic", "message"] as const) {
    if (errors[field]) fieldErrors[field] = errors[field];
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, message: "Please fix the highlighted fields and try again.", fieldErrors };
  }

  if (res.status === 429) {
    return {
      ok: false,
      message: "Too many messages in a short time. Please wait a minute and try again.",
    };
  }

  console.error("[contact] API rejected submission", res.status, body);

  // Surface the API's own reason (and status) so failures are diagnosable.
  const apiMessage = (body as { message?: unknown } | null)?.message;
  if (typeof apiMessage === "string" && apiMessage.trim() && !/server error/i.test(apiMessage)) {
    return { ok: false, message: `${apiMessage.trim()} (error ${res.status})` };
  }
  return { ok: false, message: `${GENERIC_FAILURE} (error ${res.status})` };
}
