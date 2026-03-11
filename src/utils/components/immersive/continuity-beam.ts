// @/utils/components/immersive/continuity-beam.ts
// ============================================================================
// CONTINUITY BEAM UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { CONTINUITY_BEAM_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { 
  ContinuityBeamProps, 
  ContinuityBeamVariant, 
  BeamConsciousnessLevel,
  BeamIntensity,
  BeamDirection,
  BeamPurpose,
  BeamActivationState,
  BeamSessionData
} from '@/types/components/immersive/continuity-beam';

/**
 * Get complete beam configuration for a variant
 */
export const getBeamConfig = (variant: ContinuityBeamVariant = 'session_preservation') => {
  return CONTINUITY_BEAM_VARIANTS[variant];
};

/**
 * Calculate beam classes based on variant and props
 */
export const getBeamClasses = (
  variant: ContinuityBeamVariant, 
  props: ContinuityBeamProps = {}
): string => {
  const config = getBeamConfig(variant);
  const classes = [
    'continuity-beam',
    `beam--${variant}`,
    `direction--${config.beam.direction}`,
    `intensity--${config.glow.intensity}`,
    `purpose--${config.consciousness.purpose}`,
    props.isActive ? 'beam--active' : 'beam--inactive',
    `consciousness--${config.consciousness.level}`,
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get beam styles for inline application
 */
export const getBeamStyles = (variant: ContinuityBeamVariant): React.CSSProperties => {
  const config = getBeamConfig(variant);
  
  return {
    background: config.beam.gradient,
    width: config.beam.width,
    boxShadow: config.glow.primary,
    filter: `blur(${config.glow.spread})`,
  };
};

/**
 * Get beam animation properties
 */
export const getBeamAnimation = (variant: ContinuityBeamVariant): any => {
  const config = getBeamConfig(variant);
  return config.animation.primary;
};

/**
 * Get beam flow animation properties
 */
export const getBeamFlowAnimation = (variant: ContinuityBeamVariant): any => {
  const config = getBeamConfig(variant);
  return {
    animate: config.animation.flow.properties,
    transition: {
      duration: config.animation.flow.duration / 1000, // Convert to seconds
      ease: config.animation.flow.easing,
      repeat: Infinity,
    },
  };
};

/**
 * Get beam pulse animation properties
 */
export const getBeamPulseAnimation = (variant: ContinuityBeamVariant): any => {
  const config = getBeamConfig(variant);
  return {
    animate: config.animation.pulse.properties,
    transition: {
      duration: config.animation.pulse.duration / 1000, // Convert to seconds
      ease: config.animation.pulse.easing,
      repeat: Infinity,
    },
  };
};

/**
 * Determine appropriate beam variant for a purpose
 */
export const getBeamVariantForPurpose = (purpose: BeamPurpose): ContinuityBeamVariant => {
  const purposeMapping: Record<BeamPurpose, ContinuityBeamVariant> = {
    memory_preservation: 'session_preservation',
    emotional_support: 'emotional_context',
    cross_domain_connection: 'quantum_entanglement',
  };
  
  return purposeMapping[purpose];
};

/**
 * Calculate beam intensity based on emotional context
 */
export const calculateBeamIntensity = (emotionalContext: string): BeamIntensity => {
  const intensityMapping: Record<string, BeamIntensity> = {
    calm: 'low',
    focused: 'medium',
    creative: 'medium',
    energized: 'high',
    intense: 'high',
    mystical: 'quantum',
  };
  
  return intensityMapping[emotionalContext] || 'medium';
};

/**
 * Activate beam with session data
 */
export const activateBeam = (
  variant: ContinuityBeamVariant,
  sessionData: BeamSessionData
): BeamActivationState => {
  const config = getBeamConfig(variant);
  
  return {
    isActive: true,
    intensity: config.glow.intensity as BeamIntensity,
    purpose: config.consciousness.purpose,
    consciousnessLevel: config.consciousness.level,
    activationTime: Date.now(),
  };
};

/**
 * Deactivate beam
 */
export const deactivateBeam = (currentState: BeamActivationState): BeamActivationState => {
  return {
    ...currentState,
    isActive: false,
    intensity: 'low' as BeamIntensity,
  };
};

/**
 * Calculate beam resonance based on session data
 */
export const calculateBeamResonance = (sessionData: BeamSessionData): number => {
  let resonance = 0.5; // Base resonance
  
  // Emotional context contributes to resonance
  const emotionalFactors: Record<string, number> = {
    calm: 0.1,
    focused: 0.2,
    creative: 0.3,
    energized: 0.4,
    intense: 0.5,
    mystical: 0.7,
  };
  
  resonance += emotionalFactors[sessionData.emotionalContext] || 0;
  
  // Memory preservation boosts resonance
  if (sessionData.memoryPreservation) {
    resonance += 0.2;
  }
  
  // Cross-domain connections multiply resonance
  resonance *= (1 + (sessionData.crossDomainConnections.length * 0.1));
  
  return Math.min(resonance, 1.0);
};

/**
 * Validate beam configuration
 */
export const isValidBeamConfig = (config: any): boolean => {
  return config && 
         config.beam && 
         config.beam.width && 
         config.glow && 
         config.consciousness && 
         config.consciousness.purpose;
};

/**
 * Merge beam configurations
 */
export const mergeBeamConfigs = (
  base: any,
  overrides: Partial<any>
): any => {
  return {
    ...base,
    ...overrides,
    beam: {
      ...base.beam,
      ...overrides.beam,
    },
    glow: {
      ...base.glow,
      ...overrides.glow,
    },
    animation: {
      ...base.animation,
      ...overrides.animation,
    },
    interaction: {
      ...base.interaction,
      ...overrides.interaction,
    },
  };
};

/**
 * Get beam interaction styles for hover state
 */
export const getBeamHoverStyles = (variant: ContinuityBeamVariant): React.CSSProperties => {
  const config = getBeamConfig(variant);
  
  return {
    boxShadow: config.interaction.active.glow,
    transform: config.interaction.active.width,
  };
};

/**
 * Get beam interaction styles for active state
 */
export const getBeamActiveStyles = (variant: ContinuityBeamVariant): React.CSSProperties => {
  const config = getBeamConfig(variant);
  
  return {
    width: config.interaction.active.width,
    boxShadow: config.interaction.active.glow,
    filter: `blur(${config.interaction.active.intensity})`,
  };
};

/**
 * Check if beam should shift consciousness based on resonance
 */
export const shouldShiftBeamConsciousness = (
  currentLevel: BeamConsciousnessLevel,
  resonance: number,
  threshold: number = 0.8
): BeamConsciousnessLevel | null => {
  if (resonance > threshold && currentLevel !== 'quantum_entangled') {
    return 'quantum_entangled';
  }
  
  if (resonance <= threshold && currentLevel !== 'collaborative_emergent') {
    return 'collaborative_emergent';
  }
  
  return null;
};