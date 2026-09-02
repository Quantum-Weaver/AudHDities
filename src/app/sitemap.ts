import type { MetadataRoute } from 'next';

// THE MAP OF THE PUBLIC ROOMS — base item 222, landed 2026-09-01.
//
// Only rooms anyone may enter without signing in are listed. The law is the
// site's own: src/lib/constants/systems/environments/navigation.ts marks a
// door `requiresAuth`, `userTiers` or `minSovereignty`, and a room behind such
// a door is not here — the vessel, notifications, dashboard, contributions,
// the council, the nexus, the studio, the observatory. Nor are the auth doors,
// the API, checkout, the artisan's own loom, the stage's studio, or the
// Bridge's inbox rooms (messages, invitations, emeralds). The older names
// KP's 2026-08-24 wording ruling replaced (creations, creators, vendors) are
// left to their standing pages and not mapped twice.
//
// Dynamic pages ([slug], [id]) are not enumerated: this map is static and
// asks the base nothing at build time.
//
// The origin comes from the environment, never from a literal a build could
// carry to the wrong host; the fallback is the site's public address.

const ORIGIN = (process.env.NEXT_PUBLIC_APP_URL || 'https://audhdities.com').replace(/\/+$/, '');

const PUBLIC_ROUTES: readonly string[] = [
  // the hearth
  '/',
  // hephaestus — the public papers
  '/about',
  '/accessibility',
  '/apps/privacy',
  '/calling',
  '/contact',
  '/forge',
  '/forge/architecture/auth-flow',
  '/forge/architecture/residual-system',
  '/forge/business/ecosystem',
  '/forge/business/plan',
  '/forge/guides/artisan-onboarding',
  '/forge/guides/merchant-onboarding',
  '/forge/guides/neurodivergent-ux',
  '/press',
  '/privacy',
  '/sanctuary',
  '/terms',
  '/transparency',
  '/vision',
  // hermes — the bazaar's open halls
  '/bazaar',
  '/bazaar/artisans',
  '/bazaar/merchants',
  '/bazaar/wares',
  // athena — the library
  '/library',
  '/library/badges',
  '/library/bubbles',
  '/library/bubbles/play',
  '/library/courses',
  '/library/dailies',
  '/library/knowledge',
  '/library/lessons',
  '/library/quests',
  // prometheus — the stage (the studio is tiered)
  '/stage',
  '/stage/comedy',
  '/stage/live',
  '/stage/music',
  '/stage/recordings',
  '/stage/schedule',
  // iris — the Bridge's open rooms
  '/connect',
  '/connect/channels',
  '/connect/feed',
  '/connect/support',
  '/connect/translations',
  // cosmic — ungated, unlisted in the navigation
  '/effects',
  '/environments',
  '/playground',
  '/theater',
  // mnemosyne — the open door of the assessment
  '/questionaire',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: `${ORIGIN}${route}`,
  }));
}
