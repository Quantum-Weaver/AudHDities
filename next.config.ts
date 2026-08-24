// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  allowedDevOrigins: ['192.168.40.111', '192.168.56.1'],
  transpilePackages: ['react-syntax-highlighter'],
  async redirects() {
    return [
      // The docs hub renamed docs → forge; old addresses still land.
      {
        source: '/docs/:path*',
        destination: '/forge/:path*',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/forge',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};

export default nextConfig;