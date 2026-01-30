/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com'
      }
    ]
  },
  // Disable aggressive caching for admin dashboard
  // This ensures CRUD operations reflect immediately in production
  experimental: {
    staleTimes: {
      dynamic: 0, // No caching for dynamic routes
      static: 180, // 3 minutes for static content
    },
  },
  // Ensure ISR and on-demand revalidation work correctly
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
