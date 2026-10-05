import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { POSTS } from "./blog/posts";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

interface PageRoute {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

// Paths that must never reach the sitemap: staging leftovers and the
// e-commerce template demo that still ships with this starter.
const EXCLUDED_PREFIXES = ["/product", "/products", "/industries", "/solutions"];

const pageRoutes: PageRoute[] = [
  // ── Highest-value commercial pages ──
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/bus-ticketing-system", changeFrequency: "weekly", priority: 0.9 },
  { path: "/intercity-bus-booking-software", changeFrequency: "weekly", priority: 0.9 },
  { path: "/bus-terminal-ticketing-system", changeFrequency: "weekly", priority: 0.9 },
  { path: "/shuttle-booking-system", changeFrequency: "weekly", priority: 0.9 },
  { path: "/online-taxi-booking-system", changeFrequency: "weekly", priority: 0.9 },
  { path: "/event-ticketing-system", changeFrequency: "weekly", priority: 0.9 },
  { path: "/parcel-management-system", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.85 },

  // ── Supporting content ──
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.6 },

  // ── Legal ──
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms-and-condition", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = pageRoutes
    .filter(({ path }) => !EXCLUDED_PREFIXES.some((p) => path.startsWith(p)))
    .map(({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(path),
      changeFrequency,
      priority,
    }));

  // `lastModified` is omitted on purpose: these pages have no tracked revision
  // date, and a build-time `new Date()` would tell Google they all changed on
  // every deploy. Google treats lastmod as a hint, so omitting it is safer than
  // reporting a false one.
  const blogRoutes: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: post.featured ? 0.7 : 0.6,
    images: [absoluteUrl(post.image)],
  }));

  return [...staticRoutes, ...blogRoutes];
}
