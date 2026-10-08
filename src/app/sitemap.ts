import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { POSTS } from "./blog/posts";

interface PageRoute {
  path: string;
  /**
   * Date the page's content last changed (YYYY-MM-DD). Bump it whenever you
   * edit the page or its section components. A build-time `new Date()` would
   * tell Google every page changed on every deploy, so these stay explicit.
   */
  lastModified: string;
  priority: number;
}

// Paths that must never reach the sitemap: staging leftovers and the
// e-commerce template demo that still ships with this starter.
const EXCLUDED_PREFIXES = ["/product", "/products", "/industries", "/solutions"];

const pageRoutes: PageRoute[] = [
  // ── Highest-value commercial pages ──
  { path: "/", lastModified: "2026-10-07", priority: 1 },
  { path: "/bus-ticketing-system", lastModified: "2026-10-07", priority: 0.9 },
  { path: "/intercity-coach-booking-software", lastModified: "2026-10-08", priority: 0.9 },
  { path: "/bus-terminal-ticketing-system", lastModified: "2026-10-07", priority: 0.9 },
  { path: "/shuttle-booking-system", lastModified: "2026-10-07", priority: 0.9 },
  { path: "/online-taxi-booking-system", lastModified: "2026-10-08", priority: 0.9 },
  { path: "/event-ticketing-system", lastModified: "2026-10-08", priority: 0.9 },
  { path: "/parcel-management-system", lastModified: "2026-10-08", priority: 0.9 },
  { path: "/pricing", lastModified: "2026-10-07", priority: 0.85 },

  // ── Supporting content ──
  { path: "/about-us", lastModified: "2026-10-07", priority: 0.6 },
  { path: "/contact-us", lastModified: "2026-10-07", priority: 0.7 },
  { path: "/careers", lastModified: "2026-10-07", priority: 0.6 },

  // ── Legal ──
  { path: "/privacy-policy", lastModified: "2026-10-07", priority: 0.2 },
  { path: "/terms-and-condition", lastModified: "2026-10-07", priority: 0.2 },
];

/** YYYY-MM-DD from a date's local calendar day. */
function toDay(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = pageRoutes
    .filter(({ path }) => !EXCLUDED_PREFIXES.some((p) => path.startsWith(p)))
    .map(({ path, lastModified, priority }) => ({
      url: absoluteUrl(path),
      lastModified,
      priority,
    }));

  // Post dates are written like "Apr 23, 2026" and parse as local midnight, so
  // format them from local parts — toISOString() would shift them a day back
  // in timezones ahead of UTC.
  const postDates = POSTS.map((post) => toDay(new Date(post.date)));

  // The blog index changes whenever a post is published, so it takes the newest post's date.
  const blogIndex: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/blog"),
    lastModified: postDates.reduce((a, b) => (a > b ? a : b)),
    priority: 0.8,
  };

  const blogRoutes: MetadataRoute.Sitemap = POSTS.map((post, i) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: postDates[i],
    priority: post.featured ? 0.7 : 0.6,
    images: [absoluteUrl(post.image)],
  }));

  return [...staticRoutes, blogIndex, ...blogRoutes];
}
