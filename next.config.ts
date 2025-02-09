import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true
      },
      {
        source: "/blog/category/:slug",
        destination: "/blog/tag/:slug",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
