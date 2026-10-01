const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cwticketingsystem.com";

/** Canonical origin, no trailing slash. */
export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

/** Build a canonical absolute URL from a site-root path (e.g. "/pricing"). */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
