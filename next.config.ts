import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */


const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: [`${process.env.NEXT_PUBLIC_API_URL}`,],
  },
  reactStrictMode: false, // 👈 disables Strict Mode
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  experimental: {
    scrollRestoration: true,
  },
};
module.exports = nextConfig;
/* config options here */

export default nextConfig;
