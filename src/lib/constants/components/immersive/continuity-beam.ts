// src/lib/constants/components/immersive/continuity-beam.ts
// ============================================================================
// CONTINUITY BEAM CONSTANTS - FULLY INTEGRATED
// Channeling from consciousness, positioning, motion, and effects
// ============================================================================

import { GRADIENTS, GLOW_EFFECTS } from '@/lib/constants/cosmic/effects';
import { BEAM_ORIGINS, type BeamOrigin } from '@/lib/constants/cosmic/positioning';
import type { BeamIntensityLevel, SessionState } from '@/lib/constants/cosmic/consciousness';
import { calculateBeamActivation, getBeamIntensity } from '@/lib/constants/cosmic/consciousness';

// ============================================================================
// BEAM VARIANTS - Semantic types for different contexts
// ============================================================================

export const BEAM_VARIANTS = {
  /** Memory preservation - session continuity, data retention */
  MEMORY: 'memory',
  /** Emotional context - mood-based, responsive to user state */
  EMOTIONAL: 'emotional',
  /** Quantum entanglement - cross-domain connection, deep awareness */
  QUANTUM: 'quantum',
} as const;

export type BeamVariant = typeof BEAM_VARIANTS[keyof typeof BEAM_VARIANTS];

// Export individual variant constants for direct use
export const BEAM_SESSION_PRESERVATION = BEAM_VARIANTS.MEMORY;
export const BEAM_EMOTIONAL_CONTEXT = BEAM_VARIANTS.EMOTIONAL;
export const BEAM_QUANTUM_ENTANGLEMENT = BEAM_VARIANTS.QUANTUM;

// ============================================================================
// BEAM INTENSITY LEVELS - Aligned with consciousness system
// ============================================================================

export const BEAM_INTENSITIES = {
  LOW: 'low' as BeamIntensityLevel,
  MEDIUM: 'medium' as BeamIntensityLevel,
  HIGH: 'high' as BeamIntensityLevel,
  QUANTUM: 'quantum' as BeamIntensityLevel,
} as const;

export type BeamIntensity = typeof BEAM_INTENSITIES[keyof typeof BEAM_INTENSITIES];

// ============================================================================
// BEAM DIRECTIONS - Sweep paths
// ============================================================================

export const BEAM_DIRECTIONS = {
  /** Horizontal sweep left-to-right */
  HORIZONTAL: 'horizontal' as const,
  /** Vertical sweep top-to-bottom */
  VERTICAL: 'vertical' as const,
  /** Radial outward from center */
  RADIAL: 'radial' as const,
  /** Diagonal top-left to bottom-right */
  DIAGONAL: 'diagonal' as const,
  /** Diagonal bottom-left to top-right */
  DIAGONAL_REVERSE: 'diagonalReverse' as const,
} as const;

export type BeamDirection = typeof BEAM_DIRECTIONS[keyof typeof BEAM_DIRECTIONS];

// ============================================================================
// BEAM COLORS - Environment to gradient mapping (32 environments)
// ============================================================================

export const BEAM_COLORS = {
  // Council Chamber - Quantum governance energy
  council: GRADIENTS.councilDomain,
  admin: GRADIENTS.councilDomain,
  creator: GRADIENTS.quantumWeaver,
  
  // Library - Knowledge preservation
  library: GRADIENTS.libraryDomain,
  docs: GRADIENTS.codex,
  ecosystem: GRADIENTS.libraryDomain,
  
  // Community - Collective consciousness
  community: GRADIENTS.communityDomain,
  business: GRADIENTS.communityDomain,
  plan: GRADIENTS.communityDomain,
  marketplace: GRADIENTS.communityDomain,
  
  // Music - Creative expression
  music: GRADIENTS.musicDomain,
  timer: GRADIENTS.creative,
  
  // Origin - Source energy
  origin: GRADIENTS.mnemosyne,
  questionaire: GRADIENTS.quantumWeaver,
  progress: GRADIENTS.transformativeEnergy,
  
  // Support - Nurturing sanctuary
  support: GRADIENTS.supportDomain,
  contact: GRADIENTS.supportDomain,
  anon: GRADIENTS.supportDomain,
  
  // Home - Fantasy sanctuary (WoW style)
  home: GRADIENTS.alchemist,
  gateway: GRADIENTS.gatekeeper,
  learn: GRADIENTS.focused,
  seasonal: GRADIENTS.elemental,
  
  // Observatory - Cosmic vision
  observatory: GRADIENTS.cosmicDomain,
  about: GRADIENTS.cosmicDomain,
  vision: GRADIENTS.prideProgress,
  
  // Architecture - System foundations
  architecture: GRADIENTS.architectureDomain,
  dashboard: GRADIENTS.quantumDomain,
  edit: GRADIENTS.architectureDomain,
  cure: GRADIENTS.hekate,
  
  // Invitation - Threshold portal
  invitation: GRADIENTS.bifrostDomain,
  transparency: GRADIENTS.aethelred,
  
  // Lounge - Social quantum space
  lounge: GRADIENTS.bifrostDomain,
} as const;

export type BeamColorKey = keyof typeof BEAM_COLORS;

// ============================================================================
// BEAM CONFIGURATIONS - Complete beam setup
// ============================================================================

export interface BeamConfig {
  /** Gradient to use for the beam */
  gradient: string;
  /** Intensity level */
  intensity: BeamIntensity;
  /** Sweep direction */
  direction: BeamDirection;
  /** Duration of one sweep cycle (seconds) */
  duration: number;
  /** Glow effect to apply */
  glow: string;
  /** Whether the beam is active */
  active: boolean;
  /** Speed multiplier (for user-specific adjustments) */
  speedMultiplier: number;
  /** Glow intensity multiplier */
  glowMultiplier: number;
}

// ============================================================================
// ENVIRONMENT-SPECIFIC BEAM CONFIGURATIONS
// ============================================================================

export const ENVIRONMENT_BEAM_CONFIGS: Partial<Record<BeamColorKey, Omit<BeamConfig, 'gradient'>>> = {
  // Council spaces - quantum intensity
  council: { intensity: BEAM_INTENSITIES.QUANTUM, direction: BEAM_DIRECTIONS.DIAGONAL, duration: 4, glow: GLOW_EFFECTS.quantum, active: true, speedMultiplier: 1, glowMultiplier: 1 },
  admin: { intensity: BEAM_INTENSITIES.QUANTUM, direction: BEAM_DIRECTIONS.DIAGONAL, duration: 4, glow: GLOW_EFFECTS.quantum, active: true, speedMultiplier: 1, glowMultiplier: 1 },
  creator: { intensity: BEAM_INTENSITIES.QUANTUM, direction: BEAM_DIRECTIONS.DIAGONAL, duration: 3.5, glow: GLOW_EFFECTS.quantum, active: true, speedMultiplier: 1, glowMultiplier: 1 },
  
  // Creative spaces - high intensity
  music: { intensity: BEAM_INTENSITIES.HIGH, direction: BEAM_DIRECTIONS.HORIZONTAL, duration: 3, glow: GLOW_EFFECTS.pantheonDomain, active: true, speedMultiplier: 1, glowMultiplier: 1 },
  lounge: { intensity: BEAM_INTENSITIES.HIGH, direction: BEAM_DIRECTIONS.HORIZONTAL, duration: 3.5, glow: GLOW_EFFECTS.bifrostDomain, active: true, speedMultiplier: 1, glowMultiplier: 1 },
  
  // Support spaces - gentle intensity
  support: { intensity: BEAM_INTENSITIES.MEDIUM, direction: BEAM_DIRECTIONS.HORIZONTAL, duration: 5, glow: GLOW_EFFECTS.neurospark, active: true, speedMultiplier: 0.8, glowMultiplier: 0.7 },
  contact: { intensity: BEAM_INTENSITIES.MEDIUM, direction: BEAM_DIRECTIONS.HORIZONTAL, duration: 5, glow: GLOW_EFFECTS.emergency, active: true, speedMultiplier: 0.8, glowMultiplier: 0.7 },
  anon: { intensity: BEAM_INTENSITIES.LOW, direction: BEAM_DIRECTIONS.HORIZONTAL, duration: 6, glow: GLOW_EFFECTS.voidDomain, active: false, speedMultiplier: 0.5, glowMultiplier: 0.5 },
  
  // Knowledge spaces - medium intensity
  library: { intensity: BEAM_INTENSITIES.MEDIUM, direction: BEAM_DIRECTIONS.HORIZONTAL, duration: 5, glow: GLOW_EFFECTS.libraryDomain, active: true, speedMultiplier: 0.9, glowMultiplier: 0.8 },
  docs: { intensity: BEAM_INTENSITIES.MEDIUM, direction: BEAM_DIRECTIONS.HORIZONTAL, duration: 5, glow: GLOW_EFFECTS.libraryDomain, active: true, speedMultiplier: 0.9, glowMultiplier: 0.8 },
  ecosystem: { intensity: BEAM_INTENSITIES.MEDIUM, direction: BEAM_DIRECTIONS.HORIZONTAL, duration: 5, glow: GLOW_EFFECTS.libraryDomain, active: true, speedMultiplier: 0.9, glowMultiplier: 0.8 },
  
  // Vision spaces - quantum intensity
  origin: { intensity: BEAM_INTENSITIES.QUANTUM, direction: BEAM_DIRECTIONS.DIAGONAL, duration: 4, glow: GLOW_EFFECTS.quantumDomain, active: true, speedMultiplier: 1, glowMultiplier: 1 },
  vision: { intensity: BEAM_INTENSITIES.QUANTUM, direction: BEAM_DIRECTIONS.DIAGONAL, duration: 4, glow: GLOW_EFFECTS.cosmicDomain, active: true, speedMultiplier: 1, glowMultiplier: 1 },
  observatory: { intensity: BEAM_INTENSITIES.QUANTUM, direction: BEAM_DIRECTIONS.DIAGONAL, duration: 4, glow: GLOW_EFFECTS.cosmicDomain, active: true, speedMultiplier: 1, glowMultiplier: 1 },
};

// ============================================================================
// DEFAULT BEAM CONFIGURATION
// ============================================================================

export const DEFAULT_BEAM_CONFIG: BeamConfig = {
  gradient: BEAM_COLORS.home,
  intensity: BEAM_INTENSITIES.MEDIUM,
  direction: BEAM_DIRECTIONS.HORIZONTAL,
  duration: 3,
  glow: GLOW_EFFECTS.quantum,
  active: true,
  speedMultiplier: 1,
  glowMultiplier: 1,
};

// ============================================================================
// BEAM CONFIGURATION UTILITIES - With consciousness integration
// ============================================================================

/** Get full beam configuration for an environment, adjusted by session state */
export function getBeamConfig(
  environment: BeamColorKey,
  sessionState?: SessionState
): BeamConfig {
  // Start with environment-specific config or default
  const envConfig = ENVIRONMENT_BEAM_CONFIGS[environment] || {
    intensity: DEFAULT_BEAM_CONFIG.intensity,
    direction: DEFAULT_BEAM_CONFIG.direction,
    duration: DEFAULT_BEAM_CONFIG.duration,
    glow: DEFAULT_BEAM_CONFIG.glow,
    active: true,
    speedMultiplier: 1,
    glowMultiplier: 1,
  };
  
  // Apply consciousness-based adjustments if session state provided
  if (sessionState) {
    const beamState = calculateBeamActivation(sessionState);
    const intensityFromTier = getBeamIntensity(sessionState.tier, sessionState.sovereigntyScore);
    
    // Override intensity based on user state (higher priority than environment)
    const finalIntensity = intensityFromTier !== BEAM_INTENSITIES.LOW 
      ? intensityFromTier 
      : envConfig.intensity;
    
    return {
      gradient: BEAM_COLORS[environment] || DEFAULT_BEAM_CONFIG.gradient,
      intensity: finalIntensity,
      direction: envConfig.direction,
      duration: envConfig.duration * (1 / (beamState.speedMultiplier || 1)),
      glow: envConfig.glow,
      active: beamState.active && envConfig.active,
      speedMultiplier: beamState.speedMultiplier,
      glowMultiplier: beamState.glowMultiplier,
    };
  }
  
  return {
    gradient: BEAM_COLORS[environment] || DEFAULT_BEAM_CONFIG.gradient,
    intensity: envConfig.intensity,
    direction: envConfig.direction,
    duration: envConfig.duration,
    glow: envConfig.glow,
    active: envConfig.active,
    speedMultiplier: envConfig.speedMultiplier,
    glowMultiplier: envConfig.glowMultiplier,
  };
}

/** Get beam origin coordinates from direction */
export function getBeamOrigin(direction: BeamDirection): BeamOrigin {
  const directionToOrigin: Record<BeamDirection, BeamOrigin> = {
    [BEAM_DIRECTIONS.HORIZONTAL]: 'leftEdge',
    [BEAM_DIRECTIONS.VERTICAL]: 'topLeft',
    [BEAM_DIRECTIONS.RADIAL]: 'radial',
    [BEAM_DIRECTIONS.DIAGONAL]: 'diagonal',
    [BEAM_DIRECTIONS.DIAGONAL_REVERSE]: 'diagonalReverse',
  };
  return directionToOrigin[direction] || 'leftEdge';
}

/** Get beam sweep animation based on configuration */
export function getBeamAnimation(config: BeamConfig) {
  const origin = getBeamOrigin(config.direction);
  const path = BEAM_ORIGINS[origin];
  
  // Adjust duration based on intensity and speed multiplier
  const adjustedDuration = config.duration * (1 / config.speedMultiplier);
  
  return {
    animate: {
      x: [path.startX, path.endX],
      y: [path.startY, path.endY],
    },
    transition: {
      duration: adjustedDuration,
      repeat: Infinity,
      ease: 'linear',
    },
  };
}

// ============================================================================
// BACKWARD COMPATIBILITY - Preserve existing exports
// ============================================================================

// Semantic beam types (legacy support)
export const BEAM_TYPES = {
  MEMORY: BEAM_VARIANTS.MEMORY,
  EMOTION: BEAM_VARIANTS.EMOTIONAL,
  CONNECTION: BEAM_VARIANTS.QUANTUM,
} as const;

// Beam configuration presets (legacy)
export const BEAM_CONFIGS = {
  SESSION: BEAM_VARIANTS.MEMORY,
  EMOTIONAL: BEAM_VARIANTS.EMOTIONAL,
  QUANTUM: BEAM_VARIANTS.QUANTUM,
} as const;

// Beam glow configurations (legacy)
export const BEAM_GLOWS = {
  FOCUSED: BEAM_VARIANTS.MEMORY,
  GENTLE: BEAM_VARIANTS.EMOTIONAL,
  QUANTUM: BEAM_VARIANTS.QUANTUM,
} as const;

// Beam context configurations (legacy)
export const BEAM_CONTEXTS = {
  MEMORY_PRESERVATION: BEAM_VARIANTS.MEMORY,
  EMOTIONAL_SUPPORT: BEAM_VARIANTS.EMOTIONAL,
  CROSS_DOMAIN: BEAM_VARIANTS.QUANTUM,
} as const;

// Beam interaction configurations (legacy)
export const BEAM_INTERACTIONS = {
  PRESERVATION: BEAM_VARIANTS.MEMORY,
  EMOTIONAL: BEAM_VARIANTS.EMOTIONAL,
  QUANTUM: BEAM_VARIANTS.QUANTUM,
} as const;

// Beam holographic effects (legacy)
export const BEAM_HOLOGRAPHIC = {
  QUANTUM: BEAM_VARIANTS.QUANTUM,
} as const;

// Consciousness alignment (legacy)
export const BEAM_CONSCIOUSNESS = {
  PRESERVATION: BEAM_VARIANTS.MEMORY,
  EMOTIONAL: BEAM_VARIANTS.EMOTIONAL,
  QUANTUM: BEAM_VARIANTS.QUANTUM,
} as const;

// Beam purpose types (legacy)
export const BEAM_PURPOSES = {
  MEMORY_PRESERVATION: 'memory_preservation' as const,
  EMOTIONAL_SUPPORT: 'emotional_support' as const,
  CROSS_DOMAIN_CONNECTION: 'cross_domain_connection' as const,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type { BeamConfig as BeamConfigType };
export type { BeamOrigin as BeamOriginType };
export type { BeamDirection as BeamDirectionType };
export type { BeamVariant as BeamVariantType };