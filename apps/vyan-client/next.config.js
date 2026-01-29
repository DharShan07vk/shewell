/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import('next').NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["@repo/ui"],
  allowedDevOrigins: ["144.24.147.193"],
  
  // Production optimizations
  reactStrictMode: true,
  swcMinify: true,
  
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
  
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shewellcare.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "flexit-fitness.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "shewellcare-dev.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "shewell-temporary.s3.ap-south-1.amazonaws.com",
      }
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["@repo/ui", "lucide-react", "framer-motion"],
  },
  
  // Output configuration for production
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
};

export default config;
