import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    domains: [`${process.env.NEXT_PUBLIC_API_URL}`,],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
