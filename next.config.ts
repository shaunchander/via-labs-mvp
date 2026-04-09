import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  experimental: {
    // This will slow down the build but limit process count
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
