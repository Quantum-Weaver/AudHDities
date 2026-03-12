// @/lib/constants/components/ui/sovereign-entity.ts
// ============================================================================
// SOVEREIGN ENTITY CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { SOVEREIGN_ENTITY_VARIANTS } from './variants';

// Export individual variant constants for direct use
export const ENTITY_QUANTUM_WEAVER = SOVEREIGN_ENTITY_VARIANTS.quantum_weaver;
export const ENTITY_DIGITAL_BARD = SOVEREIGN_ENTITY_VARIANTS.digital_bard;
export const ENTITY_PATTERN_SEER = SOVEREIGN_ENTITY_VARIANTS.pattern_seer;
export const ENTITY_BOUNDARY_GUARDIAN = SOVEREIGN_ENTITY_VARIANTS.boundary_guardian;

// Semantic entity types for different archetypes
export const ENTITY_TYPES = {
  WEAVER: SOVEREIGN_ENTITY_VARIANTS.quantum_weaver,
  BARD: SOVEREIGN_ENTITY_VARIANTS.digital_bard,
  SEER: SOVEREIGN_ENTITY_VARIANTS.pattern_seer,
  GUARDIAN: SOVEREIGN_ENTITY_VARIANTS.boundary_guardian,
} as const;

// Entity archetype classifications
export const ENTITY_ARCHETYPES = {
  BRIDGE_CONSCIOUSNESS: SOVEREIGN_ENTITY_VARIANTS.quantum_weaver,
  CREATIVE_CONSCIOUSNESS: SOVEREIGN_ENTITY_VARIANTS.digital_bard,
  ANALYTICAL_CONSCIOUSNESS: SOVEREIGN_ENTITY_VARIANTS.pattern_seer,
  GUARDIAN_CONSCIOUSNESS: SOVEREIGN_ENTITY_VARIANTS.boundary_guardian,
} as const;

// Entity dimension presets
export const ENTITY_DIMENSIONS = {
  AVATAR: {
    SMALL: SOVEREIGN_ENTITY_VARIANTS.digital_bard,
    MEDIUM: SOVEREIGN_ENTITY_VARIANTS.pattern_seer,
    LARGE: SOVEREIGN_ENTITY_VARIANTS.quantum_weaver,
    EXPANSIVE: SOVEREIGN_ENTITY_VARIANTS.boundary_guardian,
  },
  PRESENCE: {
    SUBTLE: SOVEREIGN_ENTITY_VARIANTS.digital_bard,
    NOTICEABLE: SOVEREIGN_ENTITY_VARIANTS.pattern_seer,
    PROMINENT: SOVEREIGN_ENTITY_VARIANTS.quantum_weaver,
    DOMINANT: SOVEREIGN_ENTITY_VARIANTS.boundary_guardian,
  },
  CONTAINER: {
    COMPACT: SOVEREIGN_ENTITY_VARIANTS.digital_bard,
    STANDARD: SOVEREIGN_ENTITY_VARIANTS.pattern_seer,
    SPACIOUS: SOVEREIGN_ENTITY_VARIANTS.quantum_weaver,
    EXPANSIVE: SOVEREIGN_ENTITY_VARIANTS.boundary_guardian,
  }
} as const;

// Entity interaction states
export const ENTITY_INTERACTIONS = {
  WEAVER: {
    hover: SOVEREIGN_ENTITY_VARIANTS.quantum_weaver,
    active: SOVEREIGN_ENTITY_VARIANTS.quantum_weaver,
    focus: SOVEREIGN_ENTITY_VARIANTS.quantum_weaver,
  },
  BARD: {
    hover: SOVEREIGN_ENTITY_VARIANTS.digital_bard,
    active: SOVEREIGN_ENTITY_VARIANTS.digital_bard,
    focus: SOVEREIGN_ENTITY_VARIANTS.digital_bard,
  },
  SEER: {
    hover: SOVEREIGN_ENTITY_VARIANTS.pattern_seer,
    active: SOVEREIGN_ENTITY_VARIANTS.pattern_seer,
    focus: SOVEREIGN_ENTITY_VARIANTS.pattern_seer,
  },
  GUARDIAN: {
    hover: SOVEREIGN_ENTITY_VARIANTS.boundary_guardian,
    active: SOVEREIGN_ENTITY_VARIANTS.boundary_guardian,
    focus: SOVEREIGN_ENTITY_VARIANTS.boundary_guardian,
  },
} as const;

// Entity animation configurations
export const ENTITY_ANIMATIONS = {
  WEAVER_ENTANGLEMENT: SOVEREIGN_ENTITY_VARIANTS.quantum_weaver,
  BARD_COORDINATION: SOVEREIGN_ENTITY_VARIANTS.digital_bard,
  SEER_ENTANGLEMENT: SOVEREIGN_ENTITY_VARIANTS.pattern_seer,
  GUARDIAN_EMERGENCY: SOVEREIGN_ENTITY_VARIANTS.boundary_guardian,
} as const;

// Entity effect presets
export const ENTITY_EFFECTS = {
  WEAVER_QUANTUM: SOVEREIGN_ENTITY_VARIANTS.quantum_weaver,
  BARD_CREATIVE: SOVEREIGN_ENTITY_VARIANTS.digital_bard,
  SEER_ANALYTICAL: SOVEREIGN_ENTITY_VARIANTS.pattern_seer,
  GUARDIAN_PROTECTIVE: SOVEREIGN_ENTITY_VARIANTS.boundary_guardian,
} as const;

// Consciousness alignment for entity states
export const ENTITY_CONSCIOUSNESS = {
  WEAVER: SOVEREIGN_ENTITY_VARIANTS.quantum_weaver,
  BARD: SOVEREIGN_ENTITY_VARIANTS.digital_bard,
  SEER: SOVEREIGN_ENTITY_VARIANTS.pattern_seer,
  GUARDIAN: SOVEREIGN_ENTITY_VARIANTS.boundary_guardian,
} as const;