import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Page renamed — keep old links and search rankings pointing at it.
      {
        source: "/intercity-bus-booking-software",
        destination: "/intercity-coach-booking-software",
        permanent: true,
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
