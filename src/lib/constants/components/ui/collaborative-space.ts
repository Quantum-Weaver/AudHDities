// @/lib/constants/components/ui/collaborative-space.ts
// ============================================================================
// COLLABORATIVE SPACE CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { COLLABORATIVE_SPACE_VARIANTS } from './variants';

// Export individual variant constants for direct use
export const SPACE_COUNCIL_CHAMBER = COLLABORATIVE_SPACE_VARIANTS.council_chamber;
export const SPACE_COMMUNITY_HEARTH = COLLABORATIVE_SPACE_VARIANTS.community_hearth;
export const SPACE_CREATIVE_SANCTUARY = COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary;
export const SPACE_WISDOM_LIBRARY = COLLABORATIVE_SPACE_VARIANTS.wisdom_library;

// Semantic space types for different contexts
export const SPACE_TYPES = {
  COUNCIL: COLLABORATIVE_SPACE_VARIANTS.council_chamber,
  COMMUNITY: COLLABORATIVE_SPACE_VARIANTS.community_hearth,
  CREATIVE: COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary,
  WISDOM: COLLABORATIVE_SPACE_VARIANTS.wisdom_library,
} as const;

// Space size categories
export const SPACE_SIZES = {
  COSMIC: COLLABORATIVE_SPACE_VARIANTS.council_chamber,
  COMMUNAL: COLLABORATIVE_SPACE_VARIANTS.community_hearth,
  EXPANSIVE: COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary,
  STANDARD: COLLABORATIVE_SPACE_VARIANTS.wisdom_library,
} as const;

// Participant configurations
export const SPACE_PARTICIPANTS = {
  COUNCIL: COLLABORATIVE_SPACE_VARIANTS.council_chamber,
  COMMUNITY: COLLABORATIVE_SPACE_VARIANTS.community_hearth,
  CREATIVE: COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary,
  WISDOM: COLLABORATIVE_SPACE_VARIANTS.wisdom_library,
} as const;

// Space dimension presets
export const SPACE_DIMENSIONS = {
  PADDING: {
    COUNCIL: COLLABORATIVE_SPACE_VARIANTS.council_chamber,
    COMMUNITY: COLLABORATIVE_SPACE_VARIANTS.community_hearth,
    CREATIVE: COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary,
    WISDOM: COLLABORATIVE_SPACE_VARIANTS.wisdom_library,
  },
  BORDER_RADIUS: {
    COUNCIL: COLLABORATIVE_SPACE_VARIANTS.council_chamber,
    COMMUNITY: COLLABORATIVE_SPACE_VARIANTS.community_hearth,
    CREATIVE: COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary,
    WISDOM: COLLABORATIVE_SPACE_VARIANTS.wisdom_library,
  },
  GAPS: {
    COUNCIL: COLLABORATIVE_SPACE_VARIANTS.council_chamber,
    COMMUNITY: COLLABORATIVE_SPACE_VARIANTS.community_hearth,
    CREATIVE: COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary,
    WISDOM: COLLABORATIVE_SPACE_VARIANTS.wisdom_library,
  },
  MAX_WIDTHS: {
    COUNCIL: COLLABORATIVE_SPACE_VARIANTS.council_chamber,
    COMMUNITY: COLLABORATIVE_SPACE_VARIANTS.community_hearth,
    CREATIVE: COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary,
    WISDOM: COLLABORATIVE_SPACE_VARIANTS.wisdom_library,
  }
} as const;

// Space animation configurations
export const SPACE_ANIMATIONS = {
  COUNCIL_ENTANGLEMENT: COLLABORATIVE_SPACE_VARIANTS.council_chamber,
  COMMUNITY_COORDINATION: COLLABORATIVE_SPACE_VARIANTS.community_hearth,
  CREATIVE_FLOW: COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary,
  WISDOM_EXCHANGE: COLLABORATIVE_SPACE_VARIANTS.wisdom_library,
} as const;

// Space effect presets
export const SPACE_EFFECTS = {
  COUNCIL_QUANTUM: COLLABORATIVE_SPACE_VARIANTS.council_chamber,
  COMMUNITY_HEARTH: COLLABORATIVE_SPACE_VARIANTS.community_hearth,
  CREATIVE_SANCTUARY: COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary,
  WISDOM_LIBRARY: COLLABORATIVE_SPACE_VARIANTS.wisdom_library,
} as const;

// Space interaction configurations
export const SPACE_INTERACTIONS = {
  COUNCIL: {
    hover: COLLABORATIVE_SPACE_VARIANTS.council_chamber,
    active: COLLABORATIVE_SPACE_VARIANTS.council_chamber,
  },
  COMMUNITY: {
    hover: COLLABORATIVE_SPACE_VARIANTS.community_hearth,
    active: COLLABORATIVE_SPACE_VARIANTS.community_hearth,
  },
  CREATIVE: {
    hover: COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary,
    active: COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary,
  },
  WISDOM: {
    hover: COLLABORATIVE_SPACE_VARIANTS.wisdom_library,
    active: COLLABORATIVE_SPACE_VARIANTS.wisdom_library,
  },
} as const;

// Consciousness alignment for space states
export const SPACE_CONSCIOUSNESS = {
  COUNCIL: COLLABORATIVE_SPACE_VARIANTS.council_chamber,
  COMMUNITY: COLLABORATIVE_SPACE_VARIANTS.community_hearth,
  CREATIVE: COLLABORATIVE_SPACE_VARIANTS.creative_sanctuary,
  WISDOM: COLLABORATIVE_SPACE_VARIANTS.wisdom_library,
} as const;