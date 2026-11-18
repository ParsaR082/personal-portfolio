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
    ];
  },
};

export default nextConfig;

