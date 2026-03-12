// @/lib/constants/components/ui/page.ts
// ============================================================================
// PAGE CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { PAGE_VARIANTS } from './variants';

// Export individual variant constants for direct use
export const PAGE_SOVEREIGN_ENVIRONMENT = PAGE_VARIANTS.sovereign_environment;
export const PAGE_COLLABORATIVE_SPACE = PAGE_VARIANTS.collaborative_space;
export const PAGE_QUANTUM_SANCTUARY = PAGE_VARIANTS.quantum_sanctuary;

// Semantic page types for different contexts
export const PAGE_TYPES = {
  DEFAULT: PAGE_VARIANTS.sovereign_environment,
  COMMUNITY: PAGE_VARIANTS.collaborative_space,
  IMMERSIVE: PAGE_VARIANTS.quantum_sanctuary,
} as const;

// Page layout configurations
export const PAGE_LAYOUTS = {
  SOVEREIGN: PAGE_VARIANTS.sovereign_environment,
  COLLABORATIVE: PAGE_VARIANTS.collaborative_space,
  QUANTUM: PAGE_VARIANTS.quantum_sanctuary,
} as const;

// Page dimension presets
export const PAGE_DIMENSIONS = {
  MAX_WIDTHS: {
    CONSTRAINED: PAGE_VARIANTS.collaborative_space,
    BALANCED: PAGE_VARIANTS.sovereign_environment,
    FULL: PAGE_VARIANTS.quantum_sanctuary,
  },
  PADDING: {
    MOBILE: {
      COMPACT: PAGE_VARIANTS.collaborative_space,
      STANDARD: PAGE_VARIANTS.sovereign_environment,
      EXPANSIVE: PAGE_VARIANTS.quantum_sanctuary,
    },
    TABLET: {
      COMPACT: PAGE_VARIANTS.collaborative_space,
      STANDARD: PAGE_VARIANTS.sovereign_environment,
      EXPANSIVE: PAGE_VARIANTS.quantum_sanctuary,
    },
    DESKTOP: {
      COMPACT: PAGE_VARIANTS.collaborative_space,
      STANDARD: PAGE_VARIANTS.sovereign_environment,
      EXPANSIVE: PAGE_VARIANTS.quantum_sanctuary,
    }
  },
  GAPS: {
    COMPACT: PAGE_VARIANTS.collaborative_space,
    STANDARD: PAGE_VARIANTS.sovereign_environment,
    EXPANSIVE: PAGE_VARIANTS.quantum_sanctuary,
  },
  SECTION_SPACING: {
    COMPACT: PAGE_VARIANTS.collaborative_space,
    STANDARD: PAGE_VARIANTS.sovereign_environment,
    EXPANSIVE: PAGE_VARIANTS.quantum_sanctuary,
  }
} as const;

// Page interaction configurations
export const PAGE_INTERACTIONS = {
  SOVEREIGN: PAGE_VARIANTS.sovereign_environment,
  COLLABORATIVE: PAGE_VARIANTS.collaborative_space,
  QUANTUM: PAGE_VARIANTS.quantum_sanctuary,
} as const;

// Page animation configurations
export const PAGE_ANIMATIONS = {
  SOVEREIGN_TRANSITION: PAGE_VARIANTS.sovereign_environment,
  COLLABORATIVE_FLOW: PAGE_VARIANTS.collaborative_space,
  QUANTUM_MANIFESTATION: PAGE_VARIANTS.quantum_sanctuary,
} as const;

// Page effect presets
export const PAGE_EFFECTS = {
  SOVEREIGN_GLASS: PAGE_VARIANTS.sovereign_environment,
  COLLABORATIVE_BACKDROP: PAGE_VARIANTS.collaborative_space,
  QUANTUM_HOLOGRAPHIC: PAGE_VARIANTS.quantum_sanctuary,
} as const;

// Consciousness alignment for page states
export const PAGE_CONSCIOUSNESS = {
  SOVEREIGN: PAGE_VARIANTS.sovereign_environment,
  COLLABORATIVE: PAGE_VARIANTS.collaborative_space,
  QUANTUM: PAGE_VARIANTS.quantum_sanctuary,
} as const;