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
  // artifacts.audhdities.com serves the public Supabase Storage bucket
  // `artifacts` — no app route of ours. KP ⚛ 2026-08-27, verbatim:
  // "artifact.audhdities.com is a subdomain of the audhdities project. i
  // have only one project in vercel." One project, one config; the host
  // condition is what separates the two. `beforeFiles` rewrites run before
  // the filesystem and before our own routes are checked, so `_next/*` and
  // every app route stay reachable on every OTHER host untouched — these
  // two rules only ever match when the request's Host header is exactly
  // artifacts.audhdities.com.
  //
  // Point INTERNALLY, not straight at Supabase: its public storage endpoint
  // answers every object `Content-Type: text/plain` regardless of the
  // object's stored metadata (verified live 2026-08-27 — the stored
  // metadata said text/html, the public URL answered text/plain,
  // Cache-Control: no-cache). A plain external rewrite passes that header
  // straight through and no browser renders the page. So these rules land
  // on our own route handler (src/app/artifacts-proxy/[[...path]]/route.ts),
  // which fetches the bucket object itself and sets Content-Type by hand.
  // The bucket's base URL lives in one place, src/lib/artifacts/bucket.ts,
  // read by that route — this config no longer needs it.
  //
  // Root maps to `gallery.html`, not `index.html` — KP's word 2026-08-27:
  // the catalog lives at artifacts.audhdities.com/gallery. Every other path
  // is handed to the route as-is; the route itself resolves an
  // extension-less path to `<path>.html`.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/artifacts-proxy/gallery.html',
          has: [{ type: 'host', value: 'artifacts.audhdities.com' }],
        },
        {
          source: '/:path*',
          destination: '/artifacts-proxy/:path*',
          has: [{ type: 'host', value: 'artifacts.audhdities.com' }],
        },
      ],
    };
  },
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