import type { MetadataRoute } from 'next';

// THE ROBOTS FILE — beside the sitemap (src/app/sitemap.ts), landed 2026-09-01.
// Crawlers are kept out of the rooms the sitemap keeps out: the doors that
// need a session, the API, and the personal surfaces. The origin is read the
// same way the sitemap reads it.

const ORIGIN = (process.env.NEXT_PUBLIC_APP_URL || 'https://audhdities.com').replace(/\/+$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/artifacts-proxy/',
        '/login',
        '/signup',
        '/logout',
        '/callback',
        '/forgot-password',
        '/reset-password',
        '/dashboard',
        '/vessel',
        '/notifications',
        '/council',
        '/nexus',
        '/studio',
        '/stage/studio',
        '/observatory',
        '/bazaar/checkout',
        '/bazaar/studio',
        '/bazaar/contributions',
        '/connect/messages',
        '/connect/invitations',
        '/connect/emeralds',
      ],
    },
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
