// src/lib/constants/components/immersive/continuity_beam.ts
// ============================================================================
// CONTINUITY BEAM CONSTANTS - FULLY INTEGRATED
// Channeling from consciousness, positioning, motion, and effects
// ============================================================================

import { GRADIENTS, GLOW_EFFECTS } from '@/lib/constants/cosmic/effects';
import { BEAM_ORIGINS, type BeamOrigin } from '@/lib/constants/cosmic/positioning';
import type { BeamIntensityLevel, SessionState } from '@/lib/constants/cosmic/consciousness';
import { calculateBeamActivation, getBeamIntensity } from '@/lib/constants/cosmic/consciousness';
import { easing } from '@/lib/constants/cosmic/motion';
import type { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';

// Define beam behavior categories
type BeamCategory = 
  | 'council'      // Quantum intensity, diagonal
  | 'creative'     // High intensity, horizontal
  | 'support'      // Medium intensity, horizontal
  | 'knowledge'    // Medium intensity, horizontal
  | 'vision'       // Quantum intensity, diagonal
  | 'default';     // Default fallback

// Map each environment key to a category
const ENVIRONMENT_TO_CATEGORY: Record<EnvironmentKey, BeamCategory> = {
  // Council category
  council: 'council',
  admin: 'council',
  creator: 'council',
  
  // Creative category
  music: 'creative',
  lounge: 'creative',
  timer: 'creative',
  
  // Support category
  support: 'support',
  contact: 'support',
  anon: 'support',
  
  // Knowledge category
  library: 'knowledge',
  docs: 'knowledge',
  ecosystem: 'knowledge',
  learn: 'knowledge',
  
  // Vision category
  observatory: 'vision',
  about: 'vision',
  vision: 'vision',
  origin: 'vision',
  questionaire: 'vision',
  progress: 'vision',
  
  // Default category (remaining environments)
  home: 'default',
  gateway: 'default',
  seasonal: 'default',
  architecture: 'default',
  dashboard: 'default',
  edit: 'default',
  cure: 'default',
  invitation: 'default',
  transparency: 'default',
  marketplace: 'default',
  business: 'default',
  plan: 'default',
  community: 'default',
};

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

// Category configurations (single source)
const BEAM_CATEGORY_CONFIGS: Record<BeamCategory, Omit<BeamConfig, 'gradient' | 'variant'>> = {
  council: {
    intensity: BEAM_INTENSITIES.QUANTUM,
    direction: BEAM_DIRECTIONS.DIAGONAL,
    duration: 4,
    glow: GLOW_EFFECTS.quantum,
    active: true,
    speedMultiplier: 1,
    glowMultiplier: 1,
  },
  creative: {
    intensity: BEAM_INTENSITIES.HIGH,
    direction: BEAM_DIRECTIONS.HORIZONTAL,
    duration: 3,
    glow: GLOW_EFFECTS.pantheonDomain,
    active: true,
    speedMultiplier: 1,
    glowMultiplier: 1,
  },
  support: {
    intensity: BEAM_INTENSITIES.MEDIUM,
    direction: BEAM_DIRECTIONS.HORIZONTAL,
    duration: 5,
    glow: GLOW_EFFECTS.neurospark,
    active: true,
    speedMultiplier: 0.8,
    glowMultiplier: 0.7,
  },
  knowledge: {
    intensity: BEAM_INTENSITIES.MEDIUM,
    direction: BEAM_DIRECTIONS.HORIZONTAL,
    duration: 5,
    glow: GLOW_EFFECTS.libraryDomain,
    active: true,
    speedMultiplier: 0.9,
    glowMultiplier: 0.8,
  },
  vision: {
    intensity: BEAM_INTENSITIES.QUANTUM,
    direction: BEAM_DIRECTIONS.DIAGONAL,
    duration: 4,
    glow: GLOW_EFFECTS.cosmicDomain,
    active: true,
    speedMultiplier: 1,
    glowMultiplier: 1,
  },
  default: {
    intensity: BEAM_INTENSITIES.MEDIUM,
    direction: BEAM_DIRECTIONS.HORIZONTAL,
    duration: 3,
    glow: GLOW_EFFECTS.quantum,
    active: true,
    speedMultiplier: 1,
    glowMultiplier: 1,
  },
};

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
  /** The environment variant this config is for */
  variant: string;  
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
// DEFAULT BEAM CONFIGURATION
// ============================================================================

export const DEFAULT_BEAM_CONFIG: BeamConfig = {
  variant: 'home',
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
  environment: EnvironmentKey,
  sessionState?: SessionState
): BeamConfig {
  const category = ENVIRONMENT_TO_CATEGORY[environment] || 'default';
  const categoryConfig = BEAM_CATEGORY_CONFIGS[category];
  
  if (sessionState) {
    const beamState = calculateBeamActivation(sessionState);
    const intensityFromTier = getBeamIntensity(sessionState.tier, sessionState.sovereigntyScore);
    
    const finalIntensity = intensityFromTier !== BEAM_INTENSITIES.LOW 
      ? intensityFromTier 
      : categoryConfig.intensity;
    
    return {
      variant: environment,
      gradient: BEAM_COLORS[environment] || DEFAULT_BEAM_CONFIG.gradient,
      intensity: finalIntensity,
      direction: categoryConfig.direction,
      duration: categoryConfig.duration * (1 / (beamState.speedMultiplier || 1)),
      glow: categoryConfig.glow,
      active: beamState.active && categoryConfig.active,
      speedMultiplier: beamState.speedMultiplier,
      glowMultiplier: beamState.glowMultiplier,
    };
  }
  
  return {
    variant: environment,
    gradient: BEAM_COLORS[environment] || DEFAULT_BEAM_CONFIG.gradient,
    ...categoryConfig,
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
      ease: easing.linear,
    },
  };
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type { BeamConfig as BeamConfigType };
export type { BeamOrigin as BeamOriginType };
export type { BeamDirection as BeamDirectionType };
export type { BeamVariant as BeamVariantType };