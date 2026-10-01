import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Paths that must never be indexed or crawled.
 *
 * - `/api` — route handlers, no HTML to index.
 * - `/product`, `/products` — template e-commerce demo still in the repo. If you
 *   ship a real catalogue under these paths, remove them here.
 * - `/industries`, `/solutions` — permanently redirected in next.config.ts.
 *   Blocking the old paths stops crawlers burning budget on the redirect chain.
 * - Next.js internals and query-string noise that never render distinct pages.
 */
const DISALLOW = [
  "/api/",
  "/product/",
  "/products/",
  "/industries/",
  "/solutions/",
  "/_next/",
  "/*?*",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
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
