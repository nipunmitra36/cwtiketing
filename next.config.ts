import type { NextConfig } from "next";

// Files in /public have no content hash in their names, so they can't be
// cached "forever" like /_next/static. 30 days (+1 day served stale while the
// browser revalidates) covers repeat visits; a replaced file under the same
// name can take up to 30 days to reach returning visitors — rename it instead
// (e.g. hero-720-v2.mp4) when it must change immediately.
const PUBLIC_ASSET_CACHE = "public, max-age=2592000, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  experimental: {
    // Tailwind CSS is small (~25 KB), so inlining it in the HTML removes the
    // render-blocking stylesheet request on first visit. Production only.
    inlineCss: true,
  },

  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: PUBLIC_ASSET_CACHE }],
      },
      {
        source: "/icons/:path*",
        headers: [{ key: "Cache-Control", value: PUBLIC_ASSET_CACHE }],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: PUBLIC_ASSET_CACHE }],
      },
    ];
  },

  async redirects() {
    return [
      // Page renamed — keep old links and search rankings pointing at it.
      {
        source: "/intercity-bus-booking-software",
        destination: "/intercity-coach-booking-software",
        permanent: true,
      },
      // Old marketplace URL (and anything under it) → terminal ticketing page.
      {
        source: "/bus-ticketing-marketplace-system/:path*",
        destination: "/bus-terminal-ticketing-system",
        statusCode: 301,
      },
      {
        source: "/product/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/solutions/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/industries/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/solutions",
        destination: "/",
        permanent: true,
      },
      {
        source: "/industries",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
