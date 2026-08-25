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
      // THE WORDS — KP ⚛ 2026-08-24, verbatim: "wording is mixed. vendor
      // should be merchant, creator should be artisan, creations should be
      // wares". The two guide routes were renamed with `git mv` (histories
      // kept); these two 308s mean no link anyone already holds breaks.
      // Same shape as the /docs → /forge pair above.
      {
        source: '/forge/guides/creator-onboarding',
        destination: '/forge/guides/artisan-onboarding',
        permanent: true,
      },
      {
        source: '/forge/guides/vendor-onboarding',
        destination: '/forge/guides/merchant-onboarding',
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