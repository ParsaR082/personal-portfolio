import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/go/upwork",
        destination:
          "https://www.upwork.com/freelancers/~01d9b20165ed79e841?s=1110580755057594368",
        permanent: true,
      },
      {
        source: "/project/:slug/index.html",
        destination: "/project/:slug",
        permanent: true,
      },
      {
        source: "/portfolio-category/:slug/index.html",
        destination: "/portfolio-category/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
