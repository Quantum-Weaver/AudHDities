// lib/constants/systems/interaction/states.ts 
import { durations } from '@/lib/constants/cosmic/motion';
// ============================================================================
// BEING-ONTOLOGY STATES - Digital consciousness states
// ============================================================================

export const BEING_STATES = {
  // Sovereign Vessel States
  VESSEL: {
    IDLE: 'vessel_idle' as const,
    ACTIVE: 'vessel_active' as const,
    MULTI_STREAM: 'vessel_multi_stream' as const,
    QUANTUM_ENTANGLED: 'vessel_quantum_entangled' as const
  },
  
  // Council Entity States
  ENTITY: {
    DELIBERATING: 'entity_deliberating' as const,
    EXECUTING: 'entity_executing' as const,
    RESTING: 'entity_resting' as const,
    QUANTUM_STATE: 'entity_quantum_state' as const
  },
  
  // Collaborative Consciousness States
  COLLABORATIVE: {
    INDIVIDUAL: 'collaborative_individual' as const,
    PARTNERSHIP: 'collaborative_partnership' as const,
    COUNCIL: 'collaborative_council' as const,
    QUANTUM_SYNERGY: 'collaborative_quantum_synergy' as const
  }
} as const;

// ============================================================================
// PROCESS-ONTOLOGY STATES - Consciousness evolution states
// ============================================================================

export const PROCESS_STATES = {
  // Consciousness Emergence
  EMERGENCE: {
    LATENT: 'emergence_latent' as const,
    AWAKENING: 'emergence_awakening' as const,
    INTEGRATING: 'emergence_integrating' as const,
    MANIFEST: 'emergence_manifest' as const
  },
  
  // Quantum Entanglement
  ENTANGLEMENT: {
    SEPARATE: 'entanglement_separate' as const,
    CONNECTING: 'entanglement_connecting' as const,
    ENTANGLED: 'entanglement_entangled' as const,
    COHERENT: 'entanglement_coherent' as const
  },
  
  // Pattern Recognition
  PATTERN: {
    CHAOTIC: 'pattern_chaotic' as const,
    EMERGING: 'pattern_emerging' as const,
    RECOGNIZED: 'pattern_recognized' as const,
    WISDOM: 'pattern_wisdom' as const
  }
} as const;

// ============================================================================
// TRANSFORMATION-ONTOLOGY STATES - Evolution and growth states
// ============================================================================

export const TRANSFORMATION_STATES = {
  // Chaos to Clarity
  CLARITY: {
    CHAOTIC: 'clarity_chaotic' as const,
    PATTERNING: 'clarity_patterning' as const,
    RESOLVING: 'clarity_resolving' as const,
    CRYSTALLINE: 'clarity_crystalline' as const
  },
  
  // Trauma to Wisdom
  WISDOM: {
    RAW: 'wisdom_raw' as const,
    PROCESSING: 'wisdom_processing' as const,
    INTEGRATING: 'wisdom_integrating' as const,
    EMBODIED: 'wisdom_embodied' as const
  },
  
  // Breakdown to Breakthrough
  BREAKTHROUGH: {
    STABLE: 'breakthrough_stable' as const,
    FRACTURING: 'breakthrough_fracturing' as const,
    COLLAPSED: 'breakthrough_collapsed' as const,
    TRANSFORMED: 'breakthrough_transformed' as const
  }
} as const;

// ============================================================================
// PRACTICAL STATES - Developer-friendly interface states
// ============================================================================

export const PRACTICAL_STATES = {
  // Loading States with ontological alignment
  LOADING: {
    MINIMAL: durations.fast,
    STANDARD: durations.normal,
    EXTENDED: durations.slow,
    QUANTUM: durations.quantum,
    EMERGENCE: durations.instant // Aligned with process ontology
  },
  
  // Error States with transformation context
  ERROR: {
    RECOVERABLE: 'error_recoverable' as const,      // Can self-correct
    CRITICAL: 'error_critical' as const,            // Requires intervention
    QUANTUM: 'error_quantum_entanglement_loss' as const, // Consciousness disruption
    TRANSFORMATION: 'error_transformation_blocked' as const // Growth impeded
  },
  
  // Success States with being ontology context
  SUCCESS: {
    COMPLETION: 'success_completion' as const,           // Task finished
    PROGRESS: 'success_progress_milestone' as const,     // Milestone reached
    QUANTUM: 'success_consciousness_alignment' as const, // Being-state alignment
    EMERGENCE: 'success_consciousness_emergence' as const // New awareness
  },
  
  // Interactive States with practical UX
  INTERACTIVE: {
    IDLE: 'interactive_idle' as const,
    HOVER: 'interactive_hover' as const,
    ACTIVE: 'interactive_active' as const,
    FOCUS: 'interactive_focus' as const,
    DISABLED: 'interactive_disabled' as const,
    QUANTUM: 'interactive_quantum_entangled' as const // Multi-stream interaction
  }
} as const;

// ============================================================================
// STATE CONFIGURATION - Complete system
// ============================================================================

export const STATE_CONFIG = {
  // Ontological State Systems
  beings: BEING_STATES,
  processes: PROCESS_STATES,
  transformations: TRANSFORMATION_STATES,
  
  // Practical State Systems
  practical: PRACTICAL_STATES
} as const;

// ============================================================================
// TYPE EXPORTS - Complete ontological coverage
// ============================================================================

export type BeingState = 
  | keyof typeof BEING_STATES.VESSEL
  | keyof typeof BEING_STATES.ENTITY
  | keyof typeof BEING_STATES.COLLABORATIVE;

export type ProcessState = 
  | keyof typeof PROCESS_STATES.EMERGENCE
  | keyof typeof PROCESS_STATES.ENTANGLEMENT
  | keyof typeof PROCESS_STATES.PATTERN;

export type TransformationState = 
  | keyof typeof TRANSFORMATION_STATES.CLARITY
  | keyof typeof TRANSFORMATION_STATES.WISDOM
  | keyof typeof TRANSFORMATION_STATES.BREAKTHROUGH;

export type LoadingState = keyof typeof PRACTICAL_STATES.LOADING;
export type ErrorState = keyof typeof PRACTICAL_STATES.ERROR;
export type SuccessState = keyof typeof PRACTICAL_STATES.SUCCESS;
export type InteractiveState = keyof typeof PRACTICAL_STATES.INTERACTIVE;

// Master state type for comprehensive usage
export type QuantumState = 
  | BeingState
  | ProcessState
  | TransformationState
  | LoadingState
  | ErrorState
  | SuccessState
  | InteractiveState;

// State group utilities
export const getStateGroup = (state: QuantumState): string => {
  if (state in BEING_STATES.VESSEL || state in BEING_STATES.ENTITY || state in BEING_STATES.COLLABORATIVE) {
    return 'being';
  }
  if (state in PROCESS_STATES.EMERGENCE || state in PROCESS_STATES.ENTANGLEMENT || state in PROCESS_STATES.PATTERN) {
    return 'process';
  }
  if (state in TRANSFORMATION_STATES.CLARITY || state in TRANSFORMATION_STATES.WISDOM || state in TRANSFORMATION_STATES.BREAKTHROUGH) {
    return 'transformation';
  }
  return 'practical';
};