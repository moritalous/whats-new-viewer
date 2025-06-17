import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  
  // Enable image optimization
  images: {
    domains: ['aws.amazon.com', 'a0.awsstatic.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Configure headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Generate sitemap.xml and robots.txt
  experimental: {
    // Enable App Router features
    appDir: true,
  },
};

export default nextConfig;
