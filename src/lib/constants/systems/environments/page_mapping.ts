// lib/constants/systems/environments/page_mapping.ts
// Static page to environment mappings (fallback when no context)

import type { PageEnvironmentMap, BaseEnvironmentKey } from './types';

export const PAGE_ENVIRONMENT_MAP: PageEnvironmentMap = {
  // HESTIA (Hearth)
  '/': { default: 'home' },
  '/vessel': { default: 'home' },
  '/vessel/sanctum': { default: 'home' },
  '/vessel/energy': { default: 'home' },
  '/vessel/constellation': { default: 'observatory' },
  '/vessel/journal': { default: 'library' },
  '/notifications': { default: 'home' },
  
  // HERMES (Bazaar)
  '/bazaar': { default: 'community' },
  '/bazaar/creations': { default: 'community' },
  '/bazaar/creations/*': { default: 'community' },
  '/bazaar/creators': { default: 'community' },
  '/bazaar/creators/*': { default: 'community' },
  '/bazaar/vendors': { default: 'community' },
  '/bazaar/vendors/*': { default: 'community' },
  '/bazaar/studio': { default: 'music' },
  '/bazaar/studio/*': { default: 'music' },
  '/bazaar/contributions': { default: 'library' },
  '/bazaar/checkout': { default: 'home' },
  
  // ATHENA (Library)
  '/library': { default: 'library' },
  '/library/quests': { default: 'library' },
  '/library/quests/*': { default: 'library' },
  '/library/courses': { default: 'library' },
  '/library/courses/*': { default: 'library' },
  '/library/lessons': { default: 'library' },
  '/library/lessons/*': { default: 'library' },
  '/library/knowledge': { default: 'library' },
  '/library/knowledge/*': { default: 'library' },
  '/library/badges': { default: 'observatory' },
  '/library/badges/*': { default: 'observatory' },
  
  // PROMETHEUS (Stage)
  '/stage': { default: 'music' },
  '/stage/live': { default: 'music' },
  '/stage/live/*': { default: 'music' },
  '/stage/schedule': { default: 'community' },
  '/stage/recordings': { default: 'lounge' },
  '/stage/recordings/*': { default: 'lounge' },
  '/stage/studio': { default: 'music' },
  '/stage/comedy': { default: 'lounge' },
  '/stage/comedy/*': { default: 'lounge' },
  '/stage/music': { default: 'music' },
  '/stage/music/*': { default: 'music' },
  
  // PROMETHEUS (Studio)
  '/studio': { default: 'music' },
  '/studio/music': { default: 'music' },
  '/studio/art': { default: 'music' },
  '/studio/animation': { default: 'music' },
  '/studio/audio': { default: 'architecture' },
  '/studio/video': { default: 'architecture' },
  '/studio/writing': { default: 'library' },
  '/studio/graphics': { default: 'music' },
  '/studio/effects': { default: 'music' },
  '/studio/export': { default: 'home' },
  
  // THEMIS (Council)
  '/council': { default: 'council' },
  '/council/proposals': { default: 'council' },
  '/council/proposals/*': { default: 'council' },
  '/council/voting': { default: 'council' },
  '/council/delegation': { default: 'council' },
  '/council/curators': { default: 'council' },
  '/council/ledger': { default: 'architecture' },
  '/council/reports': { default: 'council' },
  '/council/admin': { default: 'council' },
  '/council/applications': { default: 'council' },
  '/council/applications/*': { default: 'council' },
  
  // IRIS (Bridge)
  '/connect': { default: 'community' },
  '/connect/messages': { default: 'community' },
  '/connect/messages/*': { default: 'community' },
  '/connect/channels': { default: 'community' },
  '/connect/channels/*': { default: 'community' },
  '/connect/feed': { default: 'community' },
  '/connect/emeralds': { default: 'community' },
  '/connect/support': { default: 'support' },
  '/connect/support/*': { default: 'support' },
  '/connect/translations': { default: 'library' },
  '/connect/invitations': { default: 'community' },
  
  // AETHELRED (Nexus)
  '/nexus': { default: 'architecture' },
  '/nexus/consciousness': { default: 'architecture' },
  '/nexus/council': { default: 'council' },
  '/nexus/council/*': { default: 'council' },
  '/nexus/bridge': { default: 'architecture' },
  '/nexus/integrations': { default: 'architecture' },
  '/nexus/api': { default: 'library' },
  '/nexus/webhooks': { default: 'architecture' },
  '/nexus/status': { default: 'architecture' },
  
  // COSMIC (Design)
  '/environments': { default: 'home' },
  '/environments/*': { default: 'home' },
  '/playground': { default: 'architecture' },
  '/theater': { default: 'architecture' },
  '/effects': { default: 'music' },
  
  // SUPPORTING
  '/about': { default: 'origin' },
  '/vision': { default: 'observatory' },
  '/transparency': { default: 'council' },
  '/privacy': { default: 'home' },
  '/terms': { default: 'council' },
  '/accessibility': { default: 'home' },
  '/contact': { default: 'support' },
  '/press': { default: 'library' },
  '/careers': { default: 'invitation' },
  '/donate': { default: 'home' },
  
  // AUTH
  '/enter': { default: 'origin' },
  '/enter/*': { default: 'origin' },
};

// Helper to match a route against the map (supports wildcards)
export function getPageEnvironment(route: string): BaseEnvironmentKey {
  // Exact match first
  if (PAGE_ENVIRONMENT_MAP[route]) {
    return PAGE_ENVIRONMENT_MAP[route].default;
  }
  
  // Wildcard match (trailing /*)
  for (const [pattern, config] of Object.entries(PAGE_ENVIRONMENT_MAP)) {
    if (pattern.endsWith('/*')) {
      const basePattern = pattern.slice(0, -2);
      if (route.startsWith(basePattern)) {
        return config.default;
      }
    }
  }
  
  // Default fallback
  return 'home';
}