import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Paths that must never be indexed or crawled.
 *
 * - `/product`, `/products` — template e-commerce demo still in the repo. If you
 *   ship a real catalogue under these paths, remove them here.
 * - `/industries`, `/solutions` — permanently redirected in next.config.ts.
 *   Blocking the old paths stops crawlers burning budget on the redirect chain.
 * - Query-string noise that never renders distinct pages.
 *
 * `/_next/` is explicitly allowed: it serves the CSS, JS and optimised images
 * (`/_next/image?url=…`) Google needs to render the page. Blocking it makes
 * Googlebot see unstyled HTML. The longer `Allow` rule beats `/*?*`.
 */
const DISALLOW = [
  "/product/",
  "/products/",
  "/industries/",
  "/solutions/",
  "/*?*",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/"],
        disallow: DISALLOW,
      },
      // Ad crawlers hit the marketing pages on every request; keeping them out
      // of the way leaves crawl budget for search engines.
      {
        userAgent: ["AdsBot-Google", "AdsBot-Google-Mobile", "Mediapartners-Google"],
        disallow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
