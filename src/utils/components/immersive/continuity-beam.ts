// src/utils/components/immersive/continuity-beam.ts (simplified, only existing functions)
// ============================================================================
// CONTINUITY BEAM UTILS - PURE LOGIC FUNCTIONS (NO BREAKING CHANGES)
// ============================================================================

import { 
  BEAM_COLORS, 
  ENVIRONMENT_BEAM_CONFIGS,
  DEFAULT_BEAM_CONFIG
} from '@/lib/constants/components/immersive/continuity-beam';
import { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';
import type { BeamPurpose, BeamIntensity } from '@/types/components/immersive/continuity-beam';

/**
 * Get beam gradient for an environment
 */
export const getBeamGradient = (environment: EnvironmentKey): string => {
  return BEAM_COLORS[environment as keyof typeof BEAM_COLORS] || BEAM_COLORS.home;
};

/**
 * Get beam intensity level for an environment
 */
export const getBeamIntensityLevel = (environment: EnvironmentKey): BeamIntensity => {
  const config = ENVIRONMENT_BEAM_CONFIGS[environment as keyof typeof ENVIRONMENT_BEAM_CONFIGS];
  return (config?.intensity as BeamIntensity) || 'medium';
};

/**
 * Get beam purpose for an environment
 */
export const getBeamPurpose = (environment: EnvironmentKey): BeamPurpose => {
  const config = ENVIRONMENT_BEAM_CONFIGS[environment as keyof typeof ENVIRONMENT_BEAM_CONFIGS];
  return (config?.purpose as BeamPurpose) || 'emotional_support';
};

/**
 * Get numeric intensity value (0-1)
 */
export const getNumericIntensity = (intensity: BeamIntensity): number => {
  const intensityMap = { low: 0.33, medium: 0.47, high: 0.66, quantum: 0.85 };
  return intensityMap[intensity] || DEFAULT_BEAM_CONFIG.intensity;
};

/**
 * Calculate beam intensity based on emotional context (optional enhancement)
 */
export const calculateBeamIntensity = (
  emotionalContext?: string, 
  baseIntensity: BeamIntensity = 'medium'
): number => {
  if (!emotionalContext) return getNumericIntensity(baseIntensity);
  
  const contextMultipliers: Record<string, number> = {
    calm: 0.7,
    focused: 1.0,
    creative: 1.0,
    energized: 1.2,
    intense: 1.3,
    mystical: 1.5,
  };
  
  const multiplier = contextMultipliers[emotionalContext] || 1.0;
  return Math.min(getNumericIntensity(baseIntensity) * multiplier, 0.95);
};

/**
 * Get beam classes (safe, doesn't reference missing imports)
 */
export const getBeamClasses = (
  environment: EnvironmentKey,
  isActive: boolean = true
): string => {
  const config = ENVIRONMENT_BEAM_CONFIGS[environment as keyof typeof ENVIRONMENT_BEAM_CONFIGS];
  const classes = [
    'continuity-beam',
    `beam--${environment}`,
    `intensity--${config?.intensity || 'medium'}`,
    `purpose--${config?.purpose || 'emotional_support'}`,
    isActive ? 'beam--active' : 'beam--inactive'
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Check if beam should be visible (simple wrapper)
 */
export const shouldShowBeam = (showQuantumSweep: boolean, isActive: boolean): boolean => {
  return showQuantumSweep && isActive;
};