/**
 * Shared contract between the /contact form and the `/api/contact` route handler.
 * Safe to import from both server and client code.
 */

import { API_BASE_URL } from "@/lib/api";

/** Default API origin. The route handler prefers CONTACT_API_BASE_URL when set. */
export const CONTACT_API_BASE_URL = API_BASE_URL;

/** Upstream path, relative to the origin. */
export const CONTACT_API_ENDPOINT = "/api/v1/contacts";

/** Public path the browser form posts to (our own origin). */
export const CONTACT_FORM_ENDPOINT = "/api/contact";

export const CONTACT_TOPICS = [
  "Sales & Pricing",
  "Technical Support",
  "Book a Demo",
  "Press & Media",
  "Partnerships",
  "General Enquiry",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

/** Exact body shape the upstream API expects. */
export type ContactPayload = {
  full_name: string;
  email: string;
  topic: string;
  message: string;
};

export type ContactField = keyof ContactPayload;

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactResponse =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: ContactFieldErrors };