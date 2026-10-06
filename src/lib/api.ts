// `||` (not `??`) so an empty env value never turns API calls into relative
// URLs on the website's own origin (e.g. www.cwticketingsystem.com/api/v1/...).
const RAW_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "https://api.cwticketingsystem.com";

/** Backend API origin, no trailing slash. */
export const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

/** Build an absolute API URL from a path, collapsing duplicate slashes. */
export function apiUrl(path: string): string {
  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
}
