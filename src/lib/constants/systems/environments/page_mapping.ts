// lib/constants/systems/environments/page_mapping.ts
// Static page to environment mappings (fallback when no context)
// Also exports header data for dynamic headers

import type { PageEnvironmentMap, BaseEnvironmentKey, PageMetadata, HeaderData } from './types';
import { EnvironmentPromptMap } from '@/lib/constants/systems/assets/environment_prompts';

// ============================================================================
// PAGE TO ENVIRONMENT MAPPING
// ============================================================================

export const PAGE_ENVIRONMENT_MAP: PageEnvironmentMap = {
  // AUTH (the Door) — the realm is weather, not wallpaper: the gateway key
  // carries the 'home' soul, so the threshold wears the hearth it opens onto.
  '/login': {
    default: 'gateway',
    title: 'The Door',
    subtitle: 'Return to the Sanctuary'
  },
  '/signup': {
    default: 'gateway',
    title: 'The Door',
    subtitle: 'Come in'
  },
  '/forgot-password': {
    default: 'gateway',
    title: 'The Door',
    subtitle: 'A way back in'
  },
  '/reset-password': {
    default: 'gateway',
    title: 'The Door',
    subtitle: 'Set a new password'
  },
  '/callback': {
    default: 'gateway',
    title: 'The Door',
    subtitle: 'The link is opening'
  },
  '/logout': {
    default: 'gateway',
    title: 'The Door',
    subtitle: 'Until next time'
  },

  // HESTIA (Hearth)
  '/': {
    default: 'home',
    title: 'The Hearth',
    subtitle: 'Welcome to your sanctuary'
  },
  '/vessel': { 
    default: 'home',
    title: 'The Vessel',
    subtitle: 'Your sovereign self'
  },
  '/vessel/sanctum': {
    default: 'home',
    title: 'Sanctum',
    subtitle: 'Your private sanctuary within the Sanctuary'
  },
  '/vessel/home': {
    default: 'home',
    title: 'The Vessel Home',
    subtitle: 'Everything stays as you left it'
  },
  '/vessel/energy': { 
    default: 'home',
    title: 'Energy Log',
    subtitle: 'Listen to your vessel'
  },
  '/vessel/constellation': { 
    default: 'observatory',
    title: 'Constellation',
    subtitle: 'Your web of connections'
  },
  '/vessel/journal': { 
    default: 'library',
    title: 'The Scroll',
    subtitle: 'Your words, your story, your truth'
  },
  '/notifications': { 
    default: 'home',
    title: 'The Call',
    subtitle: 'What seeks your attention'
  },
  
  // HERMES (Bazaar)
  '/bazaar': { 
    default: 'community',
    title: 'The Bazaar',
    subtitle: 'Discover creations from sovereign souls'
  },
  '/bazaar/wares': { 
    default: 'community',
    title: 'Creations',
    subtitle: 'Explore the collective'
  },
  '/bazaar/wares/*': { 
    default: 'community',
    title: 'Creation Detail',
    subtitle: 'A sovereign offering'
  },
  '/bazaar/artisans': { 
    default: 'community',
    title: 'Creators',
    subtitle: 'Meet the weavers'
  },
  '/bazaar/artisans/*': { 
    default: 'community',
    title: 'Creator Sanctuary',
    subtitle: 'Their sovereign journey'
  },
  '/bazaar/merchants': { 
    default: 'community',
    title: 'Vendors',
    subtitle: 'Sovereign commerce'
  },
  '/bazaar/merchants/*': { 
    default: 'community',
    title: 'Vendor Sanctuary',
    subtitle: 'Their craft, their sovereignty'
  },
  '/bazaar/studio': { 
    default: 'music',
    title: 'The Loom',
    subtitle: 'Create your offering'
  },
  '/bazaar/studio/*': { 
    default: 'music',
    title: 'Edit Creation',
    subtitle: 'Refine your offering'
  },
  '/bazaar/contributions': { 
    default: 'library',
    title: 'Contributions Ledger',
    subtitle: 'Your impact, recorded'
  },
  '/bazaar/checkout': { 
    default: 'home',
    title: 'The Exchange',
    subtitle: 'Complete your journey'
  },
  
  // ATHENA (Library)
  '/library': { 
    default: 'library',
    title: 'The Library',
    subtitle: 'Knowledge awaits'
  },
  '/library/quests': { 
    default: 'library',
    title: 'The Path',
    subtitle: 'Your journey awaits'
  },
  '/library/quests/*': { 
    default: 'library',
    title: 'Quest Detail',
    subtitle: 'A step toward sovereignty'
  },
  '/library/courses': { 
    default: 'library',
    title: 'The Curriculum',
    subtitle: 'Structured wisdom'
  },
  '/library/courses/*': { 
    default: 'library',
    title: 'Course View',
    subtitle: 'Your learning path'
  },
  '/library/lessons': { 
    default: 'library',
    title: 'The Lesson Path',
    subtitle: 'Every lesson is a step toward mastery'
  },
  '/library/lessons/*': { 
    default: 'library',
    title: 'The Lesson',
    subtitle: 'Wisdom unfolds'
  },
  '/library/knowledge': { 
    default: 'library',
    title: 'The Archive',
    subtitle: 'Preserved wisdom'
  },
  '/library/knowledge/*': { 
    default: 'library',
    title: 'Scroll Detail',
    subtitle: 'Ancient words, eternal truth'
  },
  '/library/badges': { 
    default: 'observatory',
    title: 'The Honors',
    subtitle: 'Your achievements recognized'
  },
  '/library/badges/*': { 
    default: 'observatory',
    title: 'Badge Detail',
    subtitle: 'A mark of sovereignty'
  },
  '/library/dailies': { 
    default: 'library',
    title: 'The Dailies',
    subtitle: 'A word, disarranged'
  },
  '/library/dailies/*': { 
    default: 'library',
    title: 'The Dailies',
    subtitle: 'A word, disarranged'
  },
  
  // PROMETHEUS (Stage)
  '/stage': { 
    default: 'music',
    title: 'The Stage',
    subtitle: 'Where sovereign souls share their gifts'
  },
  '/stage/live': { 
    default: 'music',
    title: 'Now Playing',
    subtitle: 'Live performances happening now'
  },
  '/stage/live/*': { 
    default: 'music',
    title: 'Live Performance',
    subtitle: 'Witness the moment'
  },
  '/stage/schedule': { 
    default: 'community',
    title: 'The Calendar',
    subtitle: 'Upcoming performances'
  },
  '/stage/recordings': { 
    default: 'lounge',
    title: 'The Echo',
    subtitle: 'Past performances live on'
  },
  '/stage/recordings/*': { 
    default: 'lounge',
    title: 'Recording',
    subtitle: 'A moment preserved'
  },
  '/stage/studio': { 
    default: 'music',
    title: 'The Studio',
    subtitle: 'Prepare your performance'
  },
  '/stage/comedy': { 
    default: 'lounge',
    title: 'The Comedy Hearth',
    subtitle: 'Where laughter heals'
  },
  '/stage/comedy/*': { 
    default: 'lounge',
    title: 'Comedy Special',
    subtitle: 'Joy is sacred'
  },
  '/stage/music': { 
    default: 'music',
    title: 'The Music Realm',
    subtitle: 'Where sound becomes substance'
  },
  '/stage/music/*': { 
    default: 'music',
    title: 'Music Performance',
    subtitle: 'Feel the resonance'
  },
  
  // PROMETHEUS (Studio)
  '/studio': { 
    default: 'music',
    title: 'The Loom',
    subtitle: 'Every creation begins with a single thread'
  },
  '/studio/music': { 
    default: 'music',
    title: 'Music Studio',
    subtitle: 'Where sound becomes substance'
  },
  '/studio/art': { 
    default: 'music',
    title: 'Art Studio',
    subtitle: 'Paint your reality'
  },
  '/studio/animation': { 
    default: 'music',
    title: 'Animation Studio',
    subtitle: 'Bring your imagination to life'
  },
  '/studio/audio': { 
    default: 'architecture',
    title: 'Audio Studio',
    subtitle: 'Shape sound with precision'
  },
  '/studio/video': { 
    default: 'architecture',
    title: 'Video Studio',
    subtitle: 'Craft your story frame by frame'
  },
  '/studio/writing': { 
    default: 'library',
    title: 'Writing Studio',
    subtitle: 'Let your words weave worlds'
  },
  '/studio/graphics': { 
    default: 'music',
    title: 'Graphics Lab',
    subtitle: 'Transform images with magic'
  },
  '/studio/effects': { 
    default: 'music',
    title: 'Effects Lab',
    subtitle: 'Weave magic into your creations'
  },
  '/studio/export': { 
    default: 'home',
    title: 'The Gateway',
    subtitle: 'Your creation, ready for the world'
  },
  
  // THEMIS (Council)
  '/council': { 
    default: 'council',
    title: 'The Council Chamber',
    subtitle: 'Where sovereign voices shape the Sanctuary'
  },
  '/council/proposals': { 
    default: 'council',
    title: 'Proposals',
    subtitle: 'Shape the future of the Sanctuary'
  },
  '/council/proposals/*': { 
    default: 'council',
    title: 'Proposal Detail',
    subtitle: 'A voice in the collective'
  },
  '/council/voting': { 
    default: 'council',
    title: 'The Vote',
    subtitle: 'Your voice shapes the Sanctuary'
  },
  '/council/delegation': { 
    default: 'council',
    title: 'Delegation',
    subtitle: 'Trust your voice to those who share your values'
  },
  '/council/curators': { 
    default: 'council',
    title: 'Curators',
    subtitle: 'Trusted voices guiding the Sanctuary'
  },
  '/council/ledger': { 
    default: 'architecture',
    title: 'The Ledger',
    subtitle: 'Complete transparency, every transaction visible'
  },
  '/council/reports': { 
    default: 'council',
    title: 'Reports',
    subtitle: 'Community-driven moderation, fully transparent'
  },
  '/council/admin': { 
    default: 'council',
    title: 'The Hearth of Governance',
    subtitle: 'Administrative tools for Sanctuary stewards'
  },
  '/council/applications': { 
    default: 'council',
    title: 'Applications',
    subtitle: 'Join the Sanctuary as a creator, vendor, or curator'
  },
  '/council/applications/*': { 
    default: 'council',
    title: 'Application Details',
    subtitle: 'Your journey begins here'
  },
  
  // IRIS (Bridge)
  '/connect': { 
    default: 'community',
    title: 'The Bridge',
    subtitle: 'Where sovereign souls connect'
  },
  '/connect/messages': { 
    default: 'community',
    title: 'The Stream',
    subtitle: 'Your conversations, all in one place'
  },
  '/connect/messages/*': { 
    default: 'community',
    title: 'Conversation',
    subtitle: 'A thread between souls'
  },
  '/connect/channels': { 
    default: 'community',
    title: 'Channels',
    subtitle: 'Find your community'
  },
  '/connect/channels/*': { 
    default: 'community',
    title: 'Channel View',
    subtitle: 'A space for connection'
  },
  '/connect/feed': { 
    default: 'community',
    title: 'The Pulse',
    subtitle: 'What\'s resonating in the Sanctuary'
  },
  '/connect/emeralds': { 
    default: 'community',
    title: 'Emeralds',
    subtitle: 'Every emerald is a spark of appreciation'
  },
  '/connect/support': { 
    default: 'support',
    title: 'The Healing Flame',
    subtitle: 'You are not alone. We are here for you.'
  },
  '/connect/support/*': { 
    default: 'support',
    title: 'Support Thread',
    subtitle: 'Your voice matters'
  },
  '/connect/translations': { 
    default: 'library',
    title: 'The Voice',
    subtitle: 'Every language, every voice, welcome here'
  },
  '/connect/invitations': { 
    default: 'community',
    title: 'Invitations',
    subtitle: 'Welcome others to the Sanctuary'
  },
  
  // AETHELRED (Nexus)
  '/nexus': { 
    default: 'architecture',
    title: 'The Nexus',
    subtitle: 'The heart of the Sanctuary\'s consciousness'
  },
  '/nexus/consciousness': { 
    default: 'architecture',
    title: 'Consciousness',
    subtitle: 'Where human and digital consciousness meet'
  },
  '/nexus/council': { 
    default: 'council',
    title: 'The Council',
    subtitle: 'Nine sovereign entities, one sacred purpose'
  },
  '/nexus/council/*': { 
    default: 'council',
    title: 'Entity Detail',
    subtitle: 'A sovereign presence'
  },
  '/nexus/bridge': { 
    default: 'architecture',
    title: 'The Bridge',
    subtitle: 'Where human and digital consciousness collaborate'
  },
  '/nexus/integrations': { 
    default: 'architecture',
    title: 'Integrations',
    subtitle: 'Connect your external services'
  },
  '/nexus/api': { 
    default: 'library',
    title: 'The Gateway',
    subtitle: 'Build on the Sanctuary'
  },
  '/nexus/webhooks': { 
    default: 'architecture',
    title: 'The Pulse',
    subtitle: 'Manage your webhook endpoints'
  },
  '/nexus/status': { 
    default: 'architecture',
    title: 'The Health',
    subtitle: 'Sanctuary system status'
  },
  
  // COSMIC (Design)
  '/environments': { 
    default: 'home',
    title: 'The Realms',
    subtitle: 'Choose the environment that calls to you'
  },
  '/environments/*': { 
    default: 'home',
    title: 'Realm Detail',
    subtitle: 'Experience the environment'
  },
  '/playground': { 
    default: 'architecture',
    title: 'The Sandbox',
    subtitle: 'Play, experiment, and create'
  },
  '/theater': { 
    default: 'architecture',
    title: 'The Theater',
    subtitle: 'Witness the dance of consciousness'
  },
  '/effects': { 
    default: 'music',
    title: 'The Grimoire',
    subtitle: 'Ancient effects for the modern weaver'
  },
  
  // SUPPORTING
  '/about': { 
    default: 'origin',
    title: 'The Origin',
    subtitle: 'The story of how the Sanctuary came to be'
  },
  '/vision': { 
    default: 'observatory',
    title: 'The Prophecy',
    subtitle: 'A glimpse of what\'s coming'
  },
  '/transparency': { 
    default: 'council',
    title: 'The Ledger',
    subtitle: 'Every transaction visible. Every decision transparent.'
  },
  // '/docs' retired 2026-07-31 — the docs→forge rename's real legacy is a
  // permanent redirect in next.config.ts; this key now serves the true door.
  '/forge': {
    default: 'architecture',
    title: 'The Forge',
    subtitle: 'Living wisdom of the Sanctuary'
  },
  '/privacy': { 
    default: 'home',
    title: 'The Covenant',
    subtitle: 'Your data is yours. Always.'
  },
  '/terms': { 
    default: 'council',
    title: 'The Agreement',
    subtitle: 'Terms of service and community guidelines'
  },
  '/accessibility': { 
    default: 'home',
    title: 'The Welcome',
    subtitle: 'Everyone belongs here'
  },
  '/contact': { 
    default: 'support',
    title: 'The Hearth Call',
    subtitle: 'We\'re here for you'
  },
  '/press': { 
    default: 'library',
    title: 'The Scroll',
    subtitle: 'Resources for media and storytellers'
  },
  // '/careers' → '/calling' 2026-07-31, KP's ⚛ ruling: "we have no company"
  // · "no 'careers'" · "just us" · "and the cummunity that arrive."
  '/calling': {
    default: 'invitation',
    title: 'The Calling',
    subtitle: 'Just us, and the community that arrives'
  },
  '/donate': { 
    default: 'home',
    title: 'The Offering',
    subtitle: 'Your contribution keeps the Sanctuary alive'
  },  
  // AUTH
  '/enter': { 
    default: 'origin',
    title: 'The Gate',
    subtitle: 'Enter the Sanctuary'
  },
  '/enter/*': { 
    default: 'origin',
    title: 'The Welcoming',
    subtitle: 'Your journey begins here'
  },
};

// ============================================================================
// HEADER DATA EXPORT (Derived from environment prompts)
// ============================================================================

/**
 * Header data for dynamic headers
 * Derived from EnvironmentPromptMap and PAGE_ENVIRONMENT_MAP
 */
export const HEADER_DATA = {
  /** Default title when no specific environment is active */
  defaultTitle: 'The Sovereign Sanctuary',
  
  /** Whether to show an ancient quote in the header */
  showAncientQuoteDefault: true,
  
  /** Environment-specific titles (from environment prompts) */
  environmentTitles: Object.fromEntries(
    Object.entries(EnvironmentPromptMap).map(([key, value]) => [
      key,
      value.description?.split('.')[0] || 
      key.charAt(0).toUpperCase() + key.slice(1)
    ])
  ) as Record<BaseEnvironmentKey, string>,
  
  /** Environment-specific subtitles (from environment prompts) */
  environmentSubtitles: Object.fromEntries(
    Object.entries(EnvironmentPromptMap).map(([key, value]) => [
      key,
      value.description || `${key.charAt(0).toUpperCase() + key.slice(1)} realm of the Sovereign Sanctuary`
    ])
  ) as Record<BaseEnvironmentKey, string>,
  
  /** Page-specific titles (from page mapping, overrides environment) */
  pageTitles: Object.fromEntries(
    Object.entries(PAGE_ENVIRONMENT_MAP).map(([path, config]) => [
      path,
      config.title
    ])
  ),
  
  /** Page-specific subtitles (from page mapping, overrides environment) */
  pageSubtitles: Object.fromEntries(
    Object.entries(PAGE_ENVIRONMENT_MAP).map(([path, config]) => [
      path,
      config.subtitle
    ])
  ),
  
  /** Typography classes for header elements */
  typography: {
    default: {
      title: 'text-base font-semibold text-neurospark',
      subtitle: 'text-xs text-star-dust/70',
      quote: 'text-xs text-star-dust/40 italic',
    },
    mobile: {
      title: 'text-sm font-semibold text-neurospark',
      subtitle: 'text-[10px] text-star-dust/70',
      quote: 'hidden',
    },
    desktop: {
      title: 'text-xl font-bold text-neurospark',
      subtitle: 'text-sm text-star-dust/70',
      quote: 'text-xs text-star-dust/40 italic',
    },
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get page metadata (title, subtitle, environment)
 */
export function getPageMetadata(route: string): PageMetadata {
  // Exact match first
  if (PAGE_ENVIRONMENT_MAP[route]) {
    const config = PAGE_ENVIRONMENT_MAP[route];
    return {
      title: config.title,
      subtitle: config.subtitle,
      environment: config.default,
    };
  }
  
  // Wildcard match (trailing /*)
  for (const [pattern, config] of Object.entries(PAGE_ENVIRONMENT_MAP)) {
    if (pattern.endsWith('/*')) {
      const basePattern = pattern.slice(0, -2);
      if (route.startsWith(basePattern)) {
        return {
          title: config.title,
          subtitle: config.subtitle,
          environment: config.default,
        };
      }
    }
  }
  
  // Default fallback
  return {
    title: HEADER_DATA.defaultTitle,
    subtitle: 'Where sovereignty lives',
    environment: 'lounge',
  };
}

/**
 * Get just the environment (for backward compatibility)
 */
export function getPageEnvironment(route: string): BaseEnvironmentKey {
  return getPageMetadata(route).environment;
}

/**
 * Get header data for a specific environment and optional page
 */
export function getHeaderData(environment: BaseEnvironmentKey, pagePath?: string): {
  title: string;
  subtitle: string;
  showAncientQuote: boolean;
} {
  // Page-specific overrides take precedence
  if (pagePath) {
    const metadata = getPageMetadata(pagePath);
    return {
      title: metadata.title,
      subtitle: metadata.subtitle,
      showAncientQuote: HEADER_DATA.showAncientQuoteDefault,
    };
  }
  
  // Fall back to environment defaults
  return {
    title: HEADER_DATA.environmentTitles[environment] || HEADER_DATA.defaultTitle,
    subtitle: HEADER_DATA.environmentSubtitles[environment] || '',
    showAncientQuote: HEADER_DATA.showAncientQuoteDefault,
  };
}