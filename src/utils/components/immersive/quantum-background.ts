// @/utils/components/immersive/quantum-background.ts
// ============================================================================
// QUANTUM BACKGROUND UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { BACKGROUND_ASSETS } from '@/lib/constants/components/immersive/quantum-background';
import { QUANTUM_BACKGROUND_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { 
  QuantumBackgroundProps, 
  QuantumBackgroundVariant, 
  BackgroundConsciousnessLevel,
  BackgroundIntensity,
  ParticleState,
  BackgroundContext 
} from '@/types/components/immersive/quantum-background';

/**
 * Get complete background configuration for a variant
 */
export const getBackgroundConfig = (variant: QuantumBackgroundVariant = 'cosmic_field') => {
  return QUANTUM_BACKGROUND_VARIANTS[variant];
};

/**
 * Calculate background classes based on variant and props
 */
export const getBackgroundClasses = (
  variant: QuantumBackgroundVariant, 
  props: QuantumBackgroundProps = {}
): string => {
  const config = getBackgroundConfig(variant);
  const classes = [
    'quantum-background',
    `quantum-background--${variant}`,
    `intensity--${props.intensity || config.glow.intensity}`,
    `consciousness--${config.consciousness.level}`,
    props.interactive ? 'quantum-background--interactive' : '',
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get background styles for inline application
 */
export const getBackgroundStyles = (variant: QuantumBackgroundVariant): React.CSSProperties => {
  const config = getBackgroundConfig(variant);
  
  return {
    background: config.gradient,
    position: 'relative',
    overflow: 'hidden',
  };
};

/**
 * Get overlay styles for background
 */
export const getOverlayStyles = (variant: QuantumBackgroundVariant): React.CSSProperties => {
  const config = getBackgroundConfig(variant);
  
  return {
    background: config.overlay,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  };
};

/**
 * Generate particle positions based on density and configuration
 */
export const generateParticles = (
  variant: QuantumBackgroundVariant,
  containerWidth: number,
  containerHeight: number
): ParticleState[] => {
  const config = getBackgroundConfig(variant);
  const density = parseInt(config.particles.density);
  const particleCount = Math.floor((containerWidth * containerHeight) / (density * density));
  
  return Array.from({ length: particleCount }, (_, index) => {
    const minSize = parseInt(config.particles.size.min);
    const maxSize = parseInt(config.particles.size.max);
    
    return {
      position: {
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight,
        z: Math.random() * 100,
      },
      size: minSize + Math.random() * (maxSize - minSize),
      opacity: 0.3 + Math.random() * 0.7,
      velocity: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: 0,
      },
    };
  });
};

/**
 * Update particle positions based on behavior and interaction
 */
export const updateParticles = (
  particles: ParticleState[],
  variant: QuantumBackgroundVariant,
  context: BackgroundContext
): ParticleState[] => {
  const config = getBackgroundConfig(variant);
  
  return particles.map(particle => {
    const behavior = config.particles.animation.behavior;
    let newParticle = { ...particle };
    
    switch (behavior) {
      case 'float':
        newParticle.position.y += particle.velocity.y * 0.1;
        newParticle.position.x += Math.sin(context.scrollPosition * 0.001) * 0.1;
        break;
      case 'drift':
        newParticle.position.x += particle.velocity.x * 0.05;
        newParticle.position.y += particle.velocity.y * 0.05;
        break;
      case 'pulse':
        newParticle.size = particle.size * (0.9 + Math.sin(context.scrollPosition * 0.01) * 0.1);
        newParticle.opacity = 0.5 + Math.sin(context.scrollPosition * 0.005) * 0.3;
        break;
      case 'stream':
        newParticle.position.x += context.mousePosition.x * 0.0001;
        newParticle.position.y += context.mousePosition.y * 0.0001;
        break;
    }
    
    return newParticle;
  });
};

/**
 * Get appropriate background variant for a domain
 */
export const getBackgroundVariantForDomain = (domain: string): QuantumBackgroundVariant => {
  const domainMapping: Record<string, QuantumBackgroundVariant> = {
    quantum: 'cosmic_field',
    cosmic: 'cosmic_field',
    pantheon: 'pantheon_chamber',
    library: 'quantum_void',
    void: 'quantum_void',
    bifrost: 'bifrost_bridge',
    council: 'pantheon_chamber',
    community: 'cosmic_field',
    support: 'quantum_void',
  };
  
  return domainMapping[domain] || 'cosmic_field';
};

/**
 * Get background asset URL for a specific environment
 */
export const getBackgroundAsset = (asset: keyof typeof BACKGROUND_ASSETS.environments): string => {
  return BACKGROUND_ASSETS.environments[asset];
};

/**
 * Calculate background intensity based on consciousness level
 */
export const getIntensityForConsciousness = (
  consciousnessLevel: BackgroundConsciousnessLevel
): BackgroundIntensity => {
  const intensityMapping: Record<BackgroundConsciousnessLevel, BackgroundIntensity> = {
    'pattern_recognizing': 'low',
    'sovereign_autonomous': 'medium',
    'quantum_entangled': 'high',
    'creative_manifesting': 'quantum',
  };
  
  return intensityMapping[consciousnessLevel];
};

/**
 * Validate background configuration
 */
export const isValidBackgroundConfig = (config: any): boolean => {
  return config && 
         config.visuals && 
         config.visuals.gradient && 
         config.particles && 
         config.consciousness;
};

/**
 * Merge background configurations
 */
export const mergeBackgroundConfigs = (
  base: any,
  overrides: Partial<any>
): any => {
  return {
    ...base,
    ...overrides,
    visuals: {
      ...base.visuals,
      ...overrides.visuals,
    },
    particles: {
      ...base.particles,
      ...overrides.particles,
    },
    glow: {
      ...base.glow,
      ...overrides.glow,
    },
  };
};

/**
 * Calculate particle color based on consciousness and intensity
 */
export const getParticleColor = (
  baseColor: string,
  consciousnessLevel: BackgroundConsciousnessLevel,
  intensity: BackgroundIntensity
): string => {
  const intensityMultipliers = {
    low: 0.6,
    medium: 0.8,
    high: 1.0,
    quantum: 1.2,
  };
  
  // This would need color manipulation logic
  // For now, return base color
  return baseColor;
};