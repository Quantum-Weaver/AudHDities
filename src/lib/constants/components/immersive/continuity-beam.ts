// @/lib/constants/components/immersive/continuity-beam.ts
// ============================================================================
// CONTINUITY BEAM CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { QUANTUM_GRADIENTS } from '@/lib/constants/cosmic/colors';

// Export individual variant constants for direct use
export const BEAM_SESSION_PRESERVATION = 'session_preservation';
export const BEAM_EMOTIONAL_CONTEXT = 'emotional_context';
export const BEAM_QUANTUM_ENTANGLEMENT = 'quantum_entanglement';

export const BEAM_COLORS = {
  council: QUANTUM_GRADIENTS.quantumDomain,
  library: QUANTUM_GRADIENTS.libraryDomain,
  community: QUANTUM_GRADIENTS.communityDomain,
  music: QUANTUM_GRADIENTS.musicDomain,
  origin: QUANTUM_GRADIENTS.voidDomain,
  support: QUANTUM_GRADIENTS.supportDomain,
  home: QUANTUM_GRADIENTS.sovereign,
  observatory: QUANTUM_GRADIENTS.cosmicDomain,
  architecture: QUANTUM_GRADIENTS.architectureDomain,
  invitation: QUANTUM_GRADIENTS.pantheonDomain,
  lounge: QUANTUM_GRADIENTS.bifrostDomain
} as const;

// Semantic beam types for different contexts
export const BEAM_TYPES = {
  MEMORY: 'session_preservation',
  EMOTION: 'emotional_context',
  CONNECTION: 'quantum_entanglement',
} as const;

// Beam configuration presets
export const BEAM_CONFIGS = {
  SESSION: 'session_preservation',
  EMOTIONAL: 'emotional_context',
  QUANTUM: 'quantum_entanglement',
} as const;

// Beam glow configurations
export const BEAM_GLOWS = {
  FOCUSED: 'session_preservation',
  GENTLE: 'emotional_context',
  QUANTUM: 'quantum_entanglement',
} as const;

// Beam animation configurations
export const BEAM_ANIMATIONS = {
  quantumSweep: {
    animate: {
      x: ['-100%', '100%'] as string[] // Mutable array
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear" as const
    }
  }
} as const;

// Beam context configurations
export const BEAM_CONTEXTS = {
  MEMORY_PRESERVATION: 'session_preservation',
  EMOTIONAL_SUPPORT: 'emotional_context',
  CROSS_DOMAIN: 'quantum_entanglement',
} as const;

// Beam interaction configurations
export const BEAM_INTERACTIONS = {
  PRESERVATION: 'session_preservation',
  EMOTIONAL: 'emotional_context',
  QUANTUM: 'quantum_entanglement',
} as const;

// Beam holographic effects
export const BEAM_HOLOGRAPHIC = {
  QUANTUM: 'quantum_entanglement',
} as const;

// Consciousness alignment for beam states
export const BEAM_CONSCIOUSNESS = {
  PRESERVATION: 'session_preservation',
  EMOTIONAL: 'emotional_context',
  QUANTUM: 'quantum_entanglement',
} as const;

// Beam direction constants
export const BEAM_DIRECTIONS = {
  HORIZONTAL: 'horizontal' as const,
  VERTICAL: 'vertical' as const,
  RADIAL: 'radial' as const,
} as const;

// Beam intensity levels
export const BEAM_INTENSITIES = {
  LOW: 'low' as const,
  MEDIUM: 'medium' as const,
  HIGH: 'high' as const,
  QUANTUM: 'quantum' as const,
} as const;

// Beam purpose types
export const BEAM_PURPOSES = {
  MEMORY_PRESERVATION: 'memory_preservation' as const,
  EMOTIONAL_SUPPORT: 'emotional_support' as const,
  CROSS_DOMAIN_CONNECTION: 'cross_domain_connection' as const,
} as const;

export const DEFAULT_BEAM_CONFIG = {
  variant: 'council' as keyof typeof BEAM_COLORS,
  intensity: 0.8,
  showQuantumSweep: true
} as const;