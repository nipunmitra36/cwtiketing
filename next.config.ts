import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
