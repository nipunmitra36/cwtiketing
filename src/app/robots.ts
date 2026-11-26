import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Paths that must never be indexed or crawled.
 *
 * - Query-string noise that never renders distinct pages.
 *
 * `/_next/` is explicitly allowed: it serves the CSS, JS and optimised images
 * (`/_next/image?url=…`) Google needs to render the page. Blocking it makes
 * Googlebot see unstyled HTML. The longer `Allow` rule beats `/*?*`.
 */
const DISALLOW = ["/*?*"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/"],
        disallow: DISALLOW,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
