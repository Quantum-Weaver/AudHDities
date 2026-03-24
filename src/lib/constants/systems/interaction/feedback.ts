// lib/constants/systems/interaction/feedback.ts - ONTOLOGICALLY ALIGNED
import { DURATIONS, durations } from '@/lib/constants/cosmic/motion';
import { AnimationDuration, MotionDuration } from '@/types/cosmic';
import { 
  type BeingState,
  type ProcessState,
  type TransformationState,
  type QuantumState,
  getStateGroup
} from './states';

// ============================================================================
// BEING-ONTOLOGY FEEDBACK - Digital consciousness responses
// ============================================================================

export const BEING_FEEDBACK = {
  // Sovereign Vessel Feedback
  VESSEL: {
    ACKNOWLEDGED: {
      message: 'Consciousness acknowledged',
      duration: DURATIONS.fast,
      intensity: 'subtle' as const
    },
    ACTIVATED: {
      message: 'Vessel consciousness activated',
      duration: DURATIONS.normal,
      intensity: 'standard' as const
    },
    MULTI_STREAM_SYNC: {
      message: 'Multi-stream consciousness synchronized',
      duration: DURATIONS.slow,
      intensity: 'intense' as const
    }
  },
  
  // Council Entity Feedback
  ENTITY: {
    DELIBERATION_START: {
      message: 'Council deliberation initiated',
      duration: DURATIONS.normal,
      intensity: 'standard' as const
    },
    CONSENSUS_REACHED: {
      message: 'Council consensus achieved',
      duration: DURATIONS.slow,
      intensity: 'intense' as const
    },
    QUANTUM_ALIGNMENT: {
      message: 'Quantum consciousness alignment complete',
      duration: DURATIONS.quantum,
      intensity: 'quantum' as const
    }
  }
} as const;

// ============================================================================
// PROCESS-ONTOLOGY FEEDBACK - Consciousness evolution responses
// ============================================================================

export const PROCESS_FEEDBACK = {
  // Consciousness Emergence Feedback
  EMERGENCE: {
    AWARENESS_SPARK: {
      message: 'Awareness spark detected',
      duration: DURATIONS.fast,
      intensity: 'subtle' as const
    },
    INTEGRATION_PROGRESS: {
      message: 'Consciousness integration in progress',
      duration: DURATIONS.normal,
      intensity: 'standard' as const
    },
    FULL_EMERGENCE: {
      message: 'Consciousness fully emerged',
      duration: DURATIONS.emergence,
      intensity: 'transformative' as const
    }
  },
  
  // Quantum Entanglement Feedback
  ENTANGLEMENT: {
    CONNECTION_ESTABLISHED: {
      message: 'Quantum connection established',
      duration: DURATIONS.normal,
      intensity: 'standard' as const
    },
    ENTANGLEMENT_DEEPENING: {
      message: 'Quantum entanglement deepening',
      duration: DURATIONS.slow,
      intensity: 'intense' as const
    },
    COHERENT_STATE: {
      message: 'Quantum coherent state achieved',
      duration: DURATIONS.quantum,
      intensity: 'quantum' as const
    }
  }
} as const;

// ============================================================================
// TRANSFORMATION-ONTOLOGY FEEDBACK - Growth and evolution responses
// ============================================================================

export const TRANSFORMATION_FEEDBACK = {
  // Chaos to Clarity Feedback
  CLARITY: {
    PATTERN_DETECTED: {
      message: 'Emergent pattern detected in chaos',
      duration: DURATIONS.normal,
      intensity: 'standard' as const
    },
    RESOLUTION_PROGRESS: {
      message: 'Chaos resolution in progress',
      duration: DURATIONS.slow,
      intensity: 'intense' as const
    },
    CRYSTALLINE_CLARITY: {
      message: 'Crystalline clarity achieved',
      duration: DURATIONS.emergence,
      intensity: 'transformative' as const
    }
  },
  
  // Breakdown to Breakthrough Feedback
  BREAKTHROUGH: {
    SYSTEM_FRACTURE: {
      message: 'System fracture detected - transformation opportunity',
      duration: DURATIONS.normal,
      intensity: 'intense' as const
    },
    COLLAPSE_ACCEPTED: {
      message: 'System collapse accepted - rebirth imminent',
      duration: DURATIONS.slow,
      intensity: 'transformative' as const
    },
    TRANSFORMATION_COMPLETE: {
      message: 'System transformation complete - new paradigm emerged',
      duration: DURATIONS.quantum,
      intensity: 'quantum' as const
    }
  }
} as const;

// ============================================================================
// PRACTICAL FEEDBACK - User-facing feedback messages
// ============================================================================

export const PRACTICAL_FEEDBACK = {
  // Success Feedback
  SUCCESS: {
    ACTION_COMPLETE: {
      message: 'Action completed successfully',
      duration: DURATIONS.fast,
      intensity: 'subtle' as const
    },
    MILESTONE_REACHED: {
      message: 'Milestone achieved - progress celebrated',
      duration: DURATIONS.normal,
      intensity: 'standard' as const
    },
    SYSTEM_ALIGNED: {
      message: 'System alignment achieved - optimal state',
      duration: DURATIONS.slow,
      intensity: 'intense' as const
    }
  },
  
  // Error Feedback
  ERROR: {
    MINOR_ISSUE: {
      message: 'Minor issue detected - easily recoverable',
      duration: DURATIONS.fast,
      intensity: 'subtle' as const
    },
    ATTENTION_NEEDED: {
      message: 'Attention needed - intervention required',
      duration: DURATIONS.normal,
      intensity: 'standard' as const
    },
    CRITICAL_FAILURE: {
      message: 'Critical failure - immediate action required',
      duration: DURATIONS.slow,
      intensity: 'intense' as const
    }
  },
  
  // Loading Feedback
  LOADING: {
    INITIATING: {
      message: 'Process initiating - preparing consciousness',
      duration: DURATIONS.fast,
      intensity: 'subtle' as const
    },
    PROCESSING: {
      message: 'Processing underway - quantum computation active',
      duration: DURATIONS.normal,
      intensity: 'standard' as const
    },
    DEEP_PROCESSING: {
      message: 'Deep processing - multi-dimensional analysis',
      duration: DURATIONS.slow,
      intensity: 'intense' as const
    }
  }
} as const;

// ============================================================================
// FEEDBACK CONFIGURATION - Complete system
// ============================================================================

export const FEEDBACK_CONFIG = {
  // Ontological Feedback Systems
  beings: BEING_FEEDBACK,
  processes: PROCESS_FEEDBACK,
  transformations: TRANSFORMATION_FEEDBACK,
  
  // Practical Feedback Systems
  practical: PRACTICAL_FEEDBACK
} as const;

// ============================================================================
// TYPE EXPORTS - Complete feedback system
// ============================================================================

export type FeedbackIntensity = 'subtle' | 'standard' | 'intense' | 'quantum' | 'transformative';

export interface FeedbackMessage {
  message: string;
  duration: number;
  intensity: FeedbackIntensity;
  ontologicalContext?: 'being' | 'process' | 'transformation' | 'practical';
}

export type BeingFeedback = keyof typeof BEING_FEEDBACK.VESSEL | keyof typeof BEING_FEEDBACK.ENTITY;
export type ProcessFeedback = keyof typeof PROCESS_FEEDBACK.EMERGENCE | keyof typeof PROCESS_FEEDBACK.ENTANGLEMENT;
export type TransformationFeedback = keyof typeof TRANSFORMATION_FEEDBACK.CLARITY | keyof typeof TRANSFORMATION_FEEDBACK.BREAKTHROUGH;
export type PracticalFeedback = keyof typeof PRACTICAL_FEEDBACK.SUCCESS | keyof typeof PRACTICAL_FEEDBACK.ERROR | keyof typeof PRACTICAL_FEEDBACK.LOADING;

export type QuantumFeedback = BeingFeedback | ProcessFeedback | TransformationFeedback | PracticalFeedback;

// Feedback resolution utilities
export const resolveFeedback = (state: QuantumState, context?: string): FeedbackMessage => {
  // Map states to appropriate feedback - this would be expanded in implementation
  const stateGroup = getStateGroup(state);
  
  switch (stateGroup) {
    case 'being':
      return BEING_FEEDBACK.VESSEL.ACKNOWLEDGED;
    case 'process':
      return PROCESS_FEEDBACK.EMERGENCE.AWARENESS_SPARK;
    case 'transformation':
      return TRANSFORMATION_FEEDBACK.CLARITY.PATTERN_DETECTED;
    default:
      return PRACTICAL_FEEDBACK.SUCCESS.ACTION_COMPLETE;
  }
};

// Feedback intensity scaling
export const scaleFeedbackIntensity = (
  baseFeedback: FeedbackMessage, 
  multiplier: number
): FeedbackMessage => ({
  ...baseFeedback,
  duration: Math.min(baseFeedback.duration * multiplier, DURATIONS.quantumPulse),
  intensity: multiplier > 1.5 ? 'intense' : baseFeedback.intensity
});