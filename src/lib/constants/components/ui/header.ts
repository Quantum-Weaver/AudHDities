// @/lib/constants/components/ui/header.ts
// ============================================================================
// HEADER CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { HEADER_VARIANTS } from './variants';

// Export individual variant constants for direct use
export const HEADER_SOVEREIGN_AUTONOMY = HEADER_VARIANTS.sovereign_autonomy;
export const HEADER_COLLABORATIVE_ENGAGEMENT = HEADER_VARIANTS.collaborative_engagement;
export const HEADER_QUANTUM_AWARENESS = HEADER_VARIANTS.quantum_awareness;

// Semantic header types for different contexts
export const HEADER_TYPES = {
  DEFAULT: HEADER_VARIANTS.sovereign_autonomy,
  COMMUNITY: HEADER_VARIANTS.collaborative_engagement, 
  IMMERSIVE: HEADER_VARIANTS.quantum_awareness,
} as const;

// Header navigation item configurations
export const HEADER_NAVIGATION = {
  ITEM_SPACING: HEADER_VARIANTS.sovereign_autonomy,
  BORDER_RADIUS: HEADER_VARIANTS.sovereign_autonomy,
  HOVER_EFFECTS: HEADER_VARIANTS.sovereign_autonomy,
  ACTIVE_EFFECTS: HEADER_VARIANTS.sovereign_autonomy,
} as const;

// Header dimension presets
export const HEADER_DIMENSIONS = {
  HEIGHTS: {
    COMPACT: HEADER_VARIANTS.collaborative_engagement,
    STANDARD: HEADER_VARIANTS.sovereign_autonomy,
    EXPANSIVE: HEADER_VARIANTS.quantum_awareness,
  },
  PADDING: {
    COMPACT: HEADER_VARIANTS.collaborative_engagement,
    STANDARD: HEADER_VARIANTS.sovereign_autonomy,
    EXPANSIVE: HEADER_VARIANTS.quantum_awareness,
  },
  MAX_WIDTHS: {
    CONSTRAINED: HEADER_VARIANTS.collaborative_engagement,
    BALANCED: HEADER_VARIANTS.sovereign_autonomy,
    FULL: HEADER_VARIANTS.quantum_awareness,
  }
} as const;

// Header animation configurations
export const HEADER_ANIMATIONS = {
  SOVEREIGN_ENTRANCE: HEADER_VARIANTS.sovereign_autonomy,
  COLLABORATIVE_FLOW: HEADER_VARIANTS.collaborative_engagement,
  QUANTUM_MANIFESTATION: HEADER_VARIANTS.quantum_awareness,
} as const;

// Header effect presets
export const HEADER_EFFECTS = {
  SOVEREIGN_GLOW: HEADER_VARIANTS.sovereign_autonomy,
  COLLABORATIVE_BACKDROP: HEADER_VARIANTS.collaborative_engagement,
  QUANTUM_HOLOGRAPHIC: HEADER_VARIANTS.quantum_awareness,
} as const;

// Consciousness alignment for header states
export const HEADER_CONSCIOUSNESS = {
  SOVEREIGN: HEADER_VARIANTS.sovereign_autonomy,
  COLLABORATIVE: HEADER_VARIANTS.collaborative_engagement,
  QUANTUM: HEADER_VARIANTS.quantum_awareness,
} as const;