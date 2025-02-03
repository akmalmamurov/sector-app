import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, 
    domains: ["cdn.example.com", "some-site.com"], 
  },
};

export default nextConfig;
