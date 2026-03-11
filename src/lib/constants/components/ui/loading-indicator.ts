// @/lib/constants/components/ui/loading-indicator.ts
// ============================================================================
// LOADING INDICATOR CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { LOADING_INDICATOR_VARIANTS } from './variants';

// Export individual variant constants for direct use
export const LOADING_QUANTUM_PULSE = LOADING_INDICATOR_VARIANTS.quantum_pulse;
export const LOADING_CONSCIOUSNESS_FLOW = LOADING_INDICATOR_VARIANTS.consciousness_flow;
export const LOADING_DATA_STREAM = LOADING_INDICATOR_VARIANTS.data_stream;
export const LOADING_SYSTEM_INITIALIZATION = LOADING_INDICATOR_VARIANTS.system_initialization;

// Semantic loading types for different contexts
export const LOADING_TYPES = {
  QUANTUM: LOADING_INDICATOR_VARIANTS.quantum_pulse,
  CONSCIOUSNESS: LOADING_INDICATOR_VARIANTS.consciousness_flow,
  DATA: LOADING_INDICATOR_VARIANTS.data_stream,
  SYSTEM: LOADING_INDICATOR_VARIANTS.system_initialization,
} as const;

// Loading animation types
export const LOADING_ANIMATION_TYPES = {
  PULSE: LOADING_INDICATOR_VARIANTS.quantum_pulse,
  FLOW: LOADING_INDICATOR_VARIANTS.consciousness_flow,
  STREAM: LOADING_INDICATOR_VARIANTS.data_stream,
  INITIALIZATION: LOADING_INDICATOR_VARIANTS.system_initialization,
} as const;

// Loading progress indicator types
export const LOADING_PROGRESS_TYPES = {
  CIRCULAR: LOADING_INDICATOR_VARIANTS.quantum_pulse,
  LINEAR: LOADING_INDICATOR_VARIANTS.consciousness_flow,
  DOTS: LOADING_INDICATOR_VARIANTS.data_stream,
  SPIRAL: LOADING_INDICATOR_VARIANTS.system_initialization,
} as const;

// Loading dimension presets
export const LOADING_DIMENSIONS = {
  SIZES: {
    INLINE: {
      QUANTUM: LOADING_INDICATOR_VARIANTS.quantum_pulse,
      CONSCIOUSNESS: LOADING_INDICATOR_VARIANTS.consciousness_flow,
      DATA: LOADING_INDICATOR_VARIANTS.data_stream,
      SYSTEM: LOADING_INDICATOR_VARIANTS.system_initialization,
    },
    CONTENT: {
      QUANTUM: LOADING_INDICATOR_VARIANTS.quantum_pulse,
      CONSCIOUSNESS: LOADING_INDICATOR_VARIANTS.consciousness_flow,
      DATA: LOADING_INDICATOR_VARIANTS.data_stream,
      SYSTEM: LOADING_INDICATOR_VARIANTS.system_initialization,
    },
    FULL: {
      QUANTUM: LOADING_INDICATOR_VARIANTS.quantum_pulse,
      CONSCIOUSNESS: LOADING_INDICATOR_VARIANTS.consciousness_flow,
      DATA: LOADING_INDICATOR_VARIANTS.data_stream,
      SYSTEM: LOADING_INDICATOR_VARIANTS.system_initialization,
    }
  },
  STROKE: {
    QUANTUM: LOADING_INDICATOR_VARIANTS.quantum_pulse,
    CONSCIOUSNESS: LOADING_INDICATOR_VARIANTS.consciousness_flow,
    DATA: LOADING_INDICATOR_VARIANTS.data_stream,
    SYSTEM: LOADING_INDICATOR_VARIANTS.system_initialization,
  },
  PADDING: {
    QUANTUM: LOADING_INDICATOR_VARIANTS.quantum_pulse,
    CONSCIOUSNESS: LOADING_INDICATOR_VARIANTS.consciousness_flow,
    DATA: LOADING_INDICATOR_VARIANTS.data_stream,
    SYSTEM: LOADING_INDICATOR_VARIANTS.system_initialization,
  }
} as const;

// Loading animation configurations
export const LOADING_ANIMATIONS = {
  QUANTUM_PULSE: LOADING_INDICATOR_VARIANTS.quantum_pulse,
  CONSCIOUSNESS_FLOW: LOADING_INDICATOR_VARIANTS.consciousness_flow,
  DATA_STREAM: LOADING_INDICATOR_VARIANTS.data_stream,
  SYSTEM_INITIALIZATION: LOADING_INDICATOR_VARIANTS.system_initialization,
} as const;

// Loading effect presets
export const LOADING_EFFECTS = {
  QUANTUM_GLOW: LOADING_INDICATOR_VARIANTS.quantum_pulse,
  CONSCIOUSNESS_GRADIENT: LOADING_INDICATOR_VARIANTS.consciousness_flow,
  DATA_HOLOGRAPHIC: LOADING_INDICATOR_VARIANTS.data_stream,
  SYSTEM_BACKDROP: LOADING_INDICATOR_VARIANTS.system_initialization,
} as const;

// Loading state configurations
export const LOADING_STATES = {
  QUANTUM: LOADING_INDICATOR_VARIANTS.quantum_pulse,
  CONSCIOUSNESS: LOADING_INDICATOR_VARIANTS.consciousness_flow,
  DATA: LOADING_INDICATOR_VARIANTS.data_stream,
  SYSTEM: LOADING_INDICATOR_VARIANTS.system_initialization,
} as const;

// Consciousness alignment for loading states
export const LOADING_CONSCIOUSNESS = {
  QUANTUM: LOADING_INDICATOR_VARIANTS.quantum_pulse,
  CONSCIOUSNESS: LOADING_INDICATOR_VARIANTS.consciousness_flow,
  DATA: LOADING_INDICATOR_VARIANTS.data_stream,
  SYSTEM: LOADING_INDICATOR_VARIANTS.system_initialization,
} as const;