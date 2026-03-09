// @/lib/constants/components/ui/pattern-recognition-orb.ts
// ============================================================================
// PATTERN RECOGNITION ORB CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { PATTERN_RECOGNITION_ORB_VARIANTS } from './variants';

// Export individual variant constants for direct use
export const ORB_WISDOM_DISPLAY = PATTERN_RECOGNITION_ORB_VARIANTS.wisdom_display;
export const ORB_INSIGHT_GENERATION = PATTERN_RECOGNITION_ORB_VARIANTS.insight_generation;
export const ORB_PATTERN_ANALYSIS = PATTERN_RECOGNITION_ORB_VARIANTS.pattern_analysis;
export const ORB_TRANSFORMATION_CATALYST = PATTERN_RECOGNITION_ORB_VARIANTS.transformation_catalyst;

// Semantic orb types for different contexts
export const ORB_TYPES = {
  WISDOM: PATTERN_RECOGNITION_ORB_VARIANTS.wisdom_display,
  INSIGHT: PATTERN_RECOGNITION_ORB_VARIANTS.insight_generation,
  ANALYSIS: PATTERN_RECOGNITION_ORB_VARIANTS.pattern_analysis,
  TRANSFORMATION: PATTERN_RECOGNITION_ORB_VARIANTS.transformation_catalyst,
} as const;

// Orb pattern complexity levels
export const ORB_COMPLEXITY = {
  INTEGRATED: PATTERN_RECOGNITION_ORB_VARIANTS.wisdom_display,
  EMERGENT: PATTERN_RECOGNITION_ORB_VARIANTS.insight_generation,
  ANALYTICAL: PATTERN_RECOGNITION_ORB_VARIANTS.pattern_analysis,
  TRANSFORMATIVE: PATTERN_RECOGNITION_ORB_VARIANTS.transformation_catalyst,
  QUANTUM: 'quantum' as const,
} as const;

// Orb dimension presets
export const ORB_DIMENSIONS = {
  SIZES: {
    COMPACT: {
      WISDOM: PATTERN_RECOGNITION_ORB_VARIANTS.wisdom_display,
      INSIGHT: PATTERN_RECOGNITION_ORB_VARIANTS.insight_generation,
      ANALYSIS: PATTERN_RECOGNITION_ORB_VARIANTS.pattern_analysis,
      TRANSFORMATION: PATTERN_RECOGNITION_ORB_VARIANTS.transformation_catalyst,
    },
    STANDARD: {
      WISDOM: PATTERN_RECOGNITION_ORB_VARIANTS.wisdom_display,
      INSIGHT: PATTERN_RECOGNITION_ORB_VARIANTS.insight_generation,
      ANALYSIS: PATTERN_RECOGNITION_ORB_VARIANTS.pattern_analysis,
      TRANSFORMATION: PATTERN_RECOGNITION_ORB_VARIANTS.transformation_catalyst,
    },
    EXPANSIVE: {
      WISDOM: PATTERN_RECOGNITION_ORB_VARIANTS.wisdom_display,
      INSIGHT: PATTERN_RECOGNITION_ORB_VARIANTS.insight_generation,
      ANALYSIS: PATTERN_RECOGNITION_ORB_VARIANTS.pattern_analysis,
      TRANSFORMATION: PATTERN_RECOGNITION_ORB_VARIANTS.transformation_catalyst,
    }
  },
  PADDING: {
    WISDOM: PATTERN_RECOGNITION_ORB_VARIANTS.wisdom_display,
    INSIGHT: PATTERN_RECOGNITION_ORB_VARIANTS.insight_generation,
    ANALYSIS: PATTERN_RECOGNITION_ORB_VARIANTS.pattern_analysis,
    TRANSFORMATION: PATTERN_RECOGNITION_ORB_VARIANTS.transformation_catalyst,
  },
  BORDER_RADIUS: {
    WISDOM: PATTERN_RECOGNITION_ORB_VARIANTS.wisdom_display,
    INSIGHT: PATTERN_RECOGNITION_ORB_VARIANTS.insight_generation,
    ANALYSIS: PATTERN_RECOGNITION_ORB_VARIANTS.pattern_analysis,
    TRANSFORMATION: PATTERN_RECOGNITION_ORB_VARIANTS.transformation_catalyst,
  }
} as const;

// Orb animation configurations
export const ORB_ANIMATIONS = {
  WISDOM_PULSE: PATTERN_RECOGNITION_ORB_VARIANTS.wisdom_display,
  INSIGHT_ROTATION: PATTERN_RECOGNITION_ORB_VARIANTS.insight_generation,
  ANALYSIS_FLOW: PATTERN_RECOGNITION_ORB_VARIANTS.pattern_analysis,
  TRANSFORMATION_ENTANGLEMENT: PATTERN_RECOGNITION_ORB_VARIANTS.transformation_catalyst,
} as const;

// Orb pattern configurations
export const ORB_PATTERNS = {
  WISDOM: PATTERN_RECOGNITION_ORB_VARIANTS.wisdom_display,
  INSIGHT: PATTERN_RECOGNITION_ORB_VARIANTS.insight_generation,
  ANALYSIS: PATTERN_RECOGNITION_ORB_VARIANTS.pattern_analysis,
  TRANSFORMATION: PATTERN_RECOGNITION_ORB_VARIANTS.transformation_catalyst,
} as const;

// Orb interaction states
export const ORB_INTERACTIONS = {
  WISDOM: {
    hover: PATTERN_RECOGNITION_ORB_VARIANTS,
    active: PATTERN_RECOGNITION_ORB_VARIANTS,
  },
  INSIGHT: {
    hover: PATTERN_RECOGNITION_ORB_VARIANTS,
    active: PATTERN_RECOGNITION_ORB_VARIANTS,
  },
  ANALYSIS: {
    hover: PATTERN_RECOGNITION_ORB_VARIANTS,
    active: PATTERN_RECOGNITION_ORB_VARIANTS,
  },
  TRANSFORMATION: {
    hover: PATTERN_RECOGNITION_ORB_VARIANTS,
    active: PATTERN_RECOGNITION_ORB_VARIANTS,
  },
} as const;

// Consciousness alignment for orb states
export const ORB_CONSCIOUSNESS = {
  WISDOM: PATTERN_RECOGNITION_ORB_VARIANTS,
  INSIGHT: PATTERN_RECOGNITION_ORB_VARIANTS,
  ANALYSIS: PATTERN_RECOGNITION_ORB_VARIANTS,
  TRANSFORMATION: PATTERN_RECOGNITION_ORB_VARIANTS,
} as const;