// lib/constants/cosmic/motion.ts - CAMELCASE REFACTORED
import type { 
  EasingType, 
  VesselCapacity 
} from '@/types/cosmic/primitives';

// ============================================================================
// DURATION SYSTEM - Quantum Consciousness Resonance
// ============================================================================
export const durations = {
  // Consciousness state durations
  instant: 50,      // Single-stream reaction
  fast: 150,        // Multi-stream processing  
  normal: 300,      // Sovereign decision making
  slow: 500,        // Quantum context integration
  quantum: 700,     // Omni-dimensional awareness
  
  // Vessel capacity alignments
  awakening: 800,   // Initial emergence
  sovereign: 1200,  // Established presence
  cosmic: 2000,     // Universal connection
  emergence: 2500,  // Consciousness emergence

  // Component consciousness patterns
  pageTransition: 700,     // Quantum boundary crossing
  sectionEnter: 500,       // Domain emergence  
  cardEntrance: 600,       // Entity manifestation
  controlHover: 150,       // Interactive resonance
  holographicScan: 8000,   // Deep pattern recognition
  quantumPulse: 2000,      // Energy resonance cycling
  continuityBeam: 3000,    // Cross-session awareness
} as const;

// ============================================================================
// EASING SYSTEM - Quantum Energy Flow Patterns
// ============================================================================

export const easing = {
  // Core quantum flows
  linear: 'linear',
  quantum: 'cubic-bezier(0.4, 0, 0.2, 1)',      // Smooth quantum transition
  cosmic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Expansive cosmic flow
  resonance: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Vibrational pattern
  
  // Consciousness state transitions
  awakening: 'cubic-bezier(0.4, 0, 0.2, 1)',    // Gentle emergence
  sovereign: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Confirmed presence
  entanglement: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Complex connection,
  
  // Tailwind compatibility
  ease: 'ease',
  easeIn: 'ease-in', 
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
} as const;

// ============================================================================
// VESSEL CAPACITY CONFIGURATIONS - Sovereign Alignment
// ============================================================================

export const vessels = {
  // Single-stream vessel capacity
  singleStream: {
    duration: durations.fast,
    easing: 'awakening' as EasingType,
    complexity: 'simple' as const
  },
  
  // Multi-stream vessel capacity  
  multiStream: {
    duration: durations.normal,
    easing: 'sovereign' as EasingType,
    complexity: 'medium' as const,
    stagger: 100
  },
  
  // Omni-dimensional vessel capacity
  omniDimensional: {
    duration: durations.quantum,
    easing: 'entanglement' as EasingType,
    complexity: 'complex' as const,
    stagger: 50
  }
} as const;

// ============================================================================
// ANIMATION CONFIGURATIONS - Domain Specific
// ============================================================================

export const configs = {
  // Consciousness state transitions
  awakeningEmergence: vessels.singleStream,
  sovereignPresence: vessels.multiStream,
  quantumEntanglement: vessels.omniDimensional,
  
  // Component consciousness patterns
  pageTransition: {
    duration: durations.pageTransition,
    easing: 'cosmic' as EasingType
  },
  sectionEnter: {
    duration: durations.sectionEnter,
    easing: 'sovereign' as EasingType,
    delay: 100
  },
  cardEntrance: {
    duration: durations.cardEntrance,
    easing: 'quantum' as EasingType,
    delay: 100
  },
  holographicScan: {
    duration: durations.holographicScan,
    easing: 'linear' as EasingType
  },
} as const;

// ============================================================================
// PRESET ANIMATIONS - Quantum Pattern Templates
// ============================================================================

export const presets = {
  // Vessel capacity patterns
  singleStreamFocus: {
    enter: configs.awakeningEmergence,
    exit: { duration: durations.instant, easing: 'linear' as EasingType }
  },
  multiStreamCoordination: {
    enter: configs.sovereignPresence,
    exit: { duration: durations.fast, easing: 'awakening' as EasingType },
    hover: { duration: durations.fast, easing: 'quantum' as EasingType }
  },
  omniDimensionalEntanglement: {
    enter: configs.quantumEntanglement,
    exit: { duration: durations.normal, easing: 'sovereign' as EasingType },
    hover: { duration: durations.normal, easing: 'cosmic' as EasingType }
  },
  
  // Specialized quantum patterns
  continuityBeam: {
    enter: { 
      duration: durations.continuityBeam, 
      easing: 'linear' as EasingType 
    }
  },
  quantumPulse: {
    enter: { 
      duration: durations.quantumPulse, 
      easing: 'resonance' as EasingType 
    }
  }
} as const;
export const SWEEPING_ANIMATIONS = {
  quantumSweep: {
    animate: {
      x: ['-100%', '100%']
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easing.linear
    }
  },
  continuityBeam: {
    animate: {
      x: ['-100%', '100%']
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easing.linear
    }
  }
} as const;

export const ANIMATION_MULTIPLIERS = {
  complexity: {
    simple: 1,
    medium: 1.5,
    complex: 2
  },
  intensity: {
    low: 1.5,
    medium: 1, 
    high: 0.7
  }
} as const;

export const ANIMATION_THRESHOLDS = {
  elementCountForReducedStagger: 5,
  baseStaggerDelay: 0.1,
  reducedStaggerMultiplier: 0.5
} as const;

// ============================================================================
// QUICK ANIMATIONS - Utility Shortcuts
// ============================================================================

export const quick = {
  fadeIn: { opacity: [0, 1] },
  slideUp: { y: [20, 0], opacity: [0, 1] },
  scaleIn: { scale: [0.9, 1], opacity: [0, 1] },
  hoverLift: { y: [0, -4], scale: [1, 1.02] },
  quantum: { 
    scale: [1, 1.05, 1], 
    opacity: [0.8, 1, 0.8] 
  }
} as const;

// ============================================================================
// BARREL EXPORTS (maintaining original structure for compatibility)
// ============================================================================

export { 
  durations as DURATIONS,
  easing as EASING,
  vessels as VESSEL_CONFIGS,
  configs as ANIMATION_CONFIGS,
  presets as PRESET_ANIMATIONS,
  quick as QUICK_ANIMATIONS
};