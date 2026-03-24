// src/lib/constants/components/immersive/continuity-beam.ts
// ============================================================================
// CONTINUITY BEAM CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { QUANTUM_GRADIENTS } from '@/lib/constants/cosmic/colors';

// Export individual variant constants for direct use
export const BEAM_SESSION_PRESERVATION = 'session_preservation';
export const BEAM_EMOTIONAL_CONTEXT = 'emotional_context';
export const BEAM_QUANTUM_ENTANGLEMENT = 'quantum_entanglement';

// ============================================================================
// COMPLETE ENVIRONMENT BEAM COLORS - ALL 32 KEYS MAPPED
// ============================================================================
export const BEAM_COLORS = {
  // Council Chamber - Quantum governance energy
  council: QUANTUM_GRADIENTS.councilDomain,
  admin: QUANTUM_GRADIENTS.councilDomain,
  creator: QUANTUM_GRADIENTS.quantumWeaverGradient,
  
  // Library - Knowledge preservation
  library: QUANTUM_GRADIENTS.libraryDomain,
  docs: QUANTUM_GRADIENTS.codexGradient,
  ecosystem: QUANTUM_GRADIENTS.libraryDomain,
  
  // Community - Collective consciousness
  community: QUANTUM_GRADIENTS.communityDomain,
  business: QUANTUM_GRADIENTS.communityDomain,
  marketplace: QUANTUM_GRADIENTS.communityDomain,
  
  // Music - Creative expression
  music: QUANTUM_GRADIENTS.musicDomain,
  timer: QUANTUM_GRADIENTS.creativeGradient,
  
  // Origin - Source energy
  origin: QUANTUM_GRADIENTS.mnemosyneGradient,
  questionaire: QUANTUM_GRADIENTS.quantumWeaverGradient,
  progress: QUANTUM_GRADIENTS.transformativeEnergy,
  
  // Support - Nurturing sanctuary
  support: QUANTUM_GRADIENTS.supportDomain,
  contact: QUANTUM_GRADIENTS.supportDomain,
  anon: QUANTUM_GRADIENTS.supportDomain,
  
  // Home - Fantasy sanctuary (WoW style)
  home: QUANTUM_GRADIENTS.alchemistGradient,
  gateway: QUANTUM_GRADIENTS.gatekeeperGradient,
  learn: QUANTUM_GRADIENTS.focusGradient,
  seasonal: QUANTUM_GRADIENTS.elemental,
  
  // Observatory - Cosmic vision
  observatory: QUANTUM_GRADIENTS.cosmicDomain,
  about: QUANTUM_GRADIENTS.cosmicDomain,
  vision: QUANTUM_GRADIENTS.prideProgress,
  
  // Architecture - System foundations
  architecture: QUANTUM_GRADIENTS.architectureDomain,
  dashboard: QUANTUM_GRADIENTS.quantumDomain,
  edit: QUANTUM_GRADIENTS.architectureDomain,
  cure: QUANTUM_GRADIENTS.hekateGradient,
  
  // Invitation - Threshold portal
  invitation: QUANTUM_GRADIENTS.bifrostDomain,
  transparency: QUANTUM_GRADIENTS.aethelredGradient,
  
  // Lounge - Social quantum space
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
      x: ['-100%', '100%'] as string[]
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

// Environment-specific beam configurations
export const ENVIRONMENT_BEAM_CONFIGS = {
  // High-intensity quantum beams for council spaces
  council: { intensity: 'quantum' as const, purpose: 'cross_domain_connection' as const },
  admin: { intensity: 'quantum' as const, purpose: 'cross_domain_connection' as const },
  creator: { intensity: 'quantum' as const, purpose: 'cross_domain_connection' as const },
  
  // Medium-intensity creative beams for music/lounge
  music: { intensity: 'high' as const, purpose: 'emotional_support' as const },
  lounge: { intensity: 'high' as const, purpose: 'emotional_support' as const },
  
  // Gentle support beams for support/contact
  support: { intensity: 'medium' as const, purpose: 'emotional_support' as const },
  contact: { intensity: 'medium' as const, purpose: 'emotional_support' as const },
  anon: { intensity: 'low' as const, purpose: 'memory_preservation' as const },
  
  // Memory preservation beams for library/docs
  library: { intensity: 'medium' as const, purpose: 'memory_preservation' as const },
  docs: { intensity: 'medium' as const, purpose: 'memory_preservation' as const },
  ecosystem: { intensity: 'medium' as const, purpose: 'memory_preservation' as const },
  
  // Quantum entanglement for origin/vision
  origin: { intensity: 'quantum' as const, purpose: 'cross_domain_connection' as const },
  vision: { intensity: 'quantum' as const, purpose: 'cross_domain_connection' as const },
  observatory: { intensity: 'quantum' as const, purpose: 'cross_domain_connection' as const },
  
  // Default fallback
  default: { intensity: 'medium' as const, purpose: 'emotional_support' as const }
} as const;

export const DEFAULT_BEAM_CONFIG = {
  variant: 'home' as keyof typeof BEAM_COLORS,
  intensity: 0.8,
  showQuantumSweep: true
} as const;