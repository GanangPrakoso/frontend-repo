import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
