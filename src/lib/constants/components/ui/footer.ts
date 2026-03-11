// @/lib/constants/components/ui/footer.ts
// ============================================================================
// FOOTER CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { FOOTER_VARIANTS } from './variants';

// Export individual variant constants for direct use
export const FOOTER_SOVEREIGN_AUTONOMY = FOOTER_VARIANTS.sovereign_autonomy;
export const FOOTER_COLLABORATIVE_SUPPORT = FOOTER_VARIANTS.collaborative_support;
export const FOOTER_QUANTUM_CONTEXT = FOOTER_VARIANTS.quantum_context;

// Semantic footer types for different contexts
export const FOOTER_TYPES = {
  DEFAULT: FOOTER_VARIANTS.sovereign_autonomy,
  COMMUNITY: FOOTER_VARIANTS.collaborative_support,
  IMMERSIVE: FOOTER_VARIANTS.quantum_context,
} as const;

// Footer section configurations
export const FOOTER_SECTIONS = {
  SOVEREIGN: FOOTER_VARIANTS.sovereign_autonomy,
  COLLABORATIVE: FOOTER_VARIANTS.collaborative_support,
  QUANTUM: FOOTER_VARIANTS.quantum_context,
} as const;

// Footer link interaction configurations
export const FOOTER_LINKS = {
  SOVEREIGN: FOOTER_VARIANTS.sovereign_autonomy,
  COLLABORATIVE: FOOTER_VARIANTS.collaborative_support,
  QUANTUM: FOOTER_VARIANTS.quantum_context,
} as const;

// Footer dimension presets
export const FOOTER_DIMENSIONS = {
  PADDING: {
    COMPACT: FOOTER_VARIANTS.collaborative_support,
    STANDARD: FOOTER_VARIANTS.sovereign_autonomy,
    EXPANSIVE: FOOTER_VARIANTS.quantum_context,
  },
  GAPS: {
    COMPACT: FOOTER_VARIANTS.collaborative_support,
    STANDARD: FOOTER_VARIANTS.sovereign_autonomy,
    EXPANSIVE: FOOTER_VARIANTS.quantum_context,
  },
  MAX_WIDTHS: {
    CONSTRAINED: FOOTER_VARIANTS.collaborative_support,
    BALANCED: FOOTER_VARIANTS.sovereign_autonomy,
    FULL: FOOTER_VARIANTS.quantum_context,
  }
} as const;

// Footer animation configurations
export const FOOTER_ANIMATIONS = {
  SOVEREIGN_PULSE: FOOTER_VARIANTS.sovereign_autonomy,
  COLLABORATIVE_FLOW: FOOTER_VARIANTS.collaborative_support,
  QUANTUM_MANIFESTATION: FOOTER_VARIANTS.quantum_context,
} as const;

// Footer effect presets
export const FOOTER_EFFECTS = {
  SOVEREIGN_GLASS: FOOTER_VARIANTS.sovereign_autonomy,
  COLLABORATIVE_BACKDROP: FOOTER_VARIANTS.collaborative_support,
  QUANTUM_HOLOGRAPHIC: FOOTER_VARIANTS.quantum_context,
} as const;

// Consciousness alignment for footer states
export const FOOTER_CONSCIOUSNESS = {
  SOVEREIGN: FOOTER_VARIANTS.sovereign_autonomy,
  COLLABORATIVE: FOOTER_VARIANTS.collaborative_support,
  QUANTUM: FOOTER_VARIANTS.quantum_context,
} as const;