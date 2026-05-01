// ============================================================================
// QUANTUM BACKGROUND UTILS - PURE LOGIC FUNCTIONS
// Aligned with AssetMapper and Transition Systems
// ============================================================================

import { AssetMapper, EnvironmentKey } from '@/lib/constants/systems/assets/mapper';
import { TRANSITION_BACKGROUNDS, getTransitionBackgroundForEnvironment } from '@/lib/constants/transitions/backgrounds';
import { QUANTUM_FOREGROUNDS, getForegroundForEnvironment } from '@/lib/constants/transitions/foregrounds';
import { ENVIRONMENT_TRANSITION_MAP } from '@/lib/constants/transitions/mappings';
import type { 
  QuantumBackgroundProps,
  BackgroundIntensity,
  ParticleState,
  BackgroundContext 
} from '@/types/components/immersive/quantum-background';

// ============================================================================
// ENVIRONMENT HELPERS
// ============================================================================

/**
 * Get environment asset URLs for a specific environment and variant
 */
export const getEnvironmentAssets = (environment: EnvironmentKey, variant: number = 1) => {
  return AssetMapper.utils.getEnvironment(environment, variant);
};

/**
 * Get background image URL for an environment
 */
export const getBackgroundImageUrl = (environment: EnvironmentKey, variant: number = 1): string => {
  const assets = getEnvironmentAssets(environment, variant);
  return assets.background;
};

/**
 * Get foreground image URL for an environment
 */
export const getForegroundImageUrl = (environment: EnvironmentKey, variant: number = 1): string | null => {
  return getForegroundForEnvironment(environment);
};

/**
 * Get transition configuration for an environment
 */
export const getTransitionConfig = (environment: EnvironmentKey) => {
  return getTransitionBackgroundForEnvironment(environment);
};

// ============================================================================
// BACKGROUND CLASS HELPERS
// ============================================================================

/**
 * Calculate background classes based on environment and props
 */
export const getBackgroundClasses = (
  environment: EnvironmentKey,
  props: QuantumBackgroundProps = {}
): string => {
  const transitionConfig = getTransitionConfig(environment);
  const classes = [
    'quantum-background',
    `quantum-background--${environment}`,
    `intention--${transitionConfig.intention}`,
    props.showForeground ? 'has-foreground' : '',
    props.animated ? 'animated' : '',
    props.className || '',
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get background container styles
 */
export const getBackgroundContainerStyles = (): React.CSSProperties => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

// ============================================================================
// TRANSITION HELPERS
// ============================================================================

/**
 * Get transition duration configuration
 */
export const getTransitionDuration = (environment: EnvironmentKey) => {
  const config = getTransitionConfig(environment);
  return config.duration;
};

/**
 * Get transition gradient for overlay
 */
export const getTransitionGradient = (environment: EnvironmentKey): string => {
  const config = getTransitionConfig(environment);
  return config.gradient;
};

/**
 * Check if environment has persistent foreground
 */
export const hasPersistentForeground = (environment: EnvironmentKey): boolean => {
  const mapping = ENVIRONMENT_TRANSITION_MAP[environment];
  return mapping?.persistForeground || false;
};

/**
 * Get foreground animation config for environment
 */
export const getForegroundAnimationConfig = (environment: EnvironmentKey) => {
  const mapping = ENVIRONMENT_TRANSITION_MAP[environment];
  if (!mapping?.foreground) return null;
  return QUANTUM_FOREGROUNDS[mapping.foreground];
};

// ============================================================================
// PARTICLE SYSTEM HELPERS
// ============================================================================

/**
 * Generate particle positions based on density and configuration
 */
export const generateParticles = (
  density: number = 100,
  containerWidth: number,
  containerHeight: number
): ParticleState[] => {
  const particleCount = Math.floor((containerWidth * containerHeight) / (density * 100));
  const limitedCount = Math.min(particleCount, 500); // Cap for performance
  
  return Array.from({ length: limitedCount }, () => ({
    position: {
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      z: Math.random() * 100,
    },
    size: 2 + Math.random() * 4,
    opacity: 0.2 + Math.random() * 0.5,
    velocity: {
      x: (Math.random() - 0.5) * 0.2,
      y: (Math.random() - 0.5) * 0.2,
      z: 0,
    },
  }));
};

/**
 * Update particle positions based on behavior
 */
export const updateParticles = (
  particles: ParticleState[],
  context: BackgroundContext
): ParticleState[] => {
  return particles.map(particle => {
    const newParticle = { ...particle };
    
    // Gentle drift based on mouse position
    if (context.mousePosition) {
      newParticle.position.x += (context.mousePosition.x - newParticle.position.x) * 0.001;
      newParticle.position.y += (context.mousePosition.y - newParticle.position.y) * 0.001;
    }
    
    // Add subtle floating motion
    newParticle.position.y += Math.sin(Date.now() * 0.001 + particle.position.x * 0.01) * 0.1;
    newParticle.position.x += Math.cos(Date.now() * 0.0008 + particle.position.y * 0.01) * 0.05;
    
    // Wrap around edges
    if (newParticle.position.x < 0) newParticle.position.x = window.innerWidth;
    if (newParticle.position.x > window.innerWidth) newParticle.position.x = 0;
    if (newParticle.position.y < 0) newParticle.position.y = window.innerHeight;
    if (newParticle.position.y > window.innerHeight) newParticle.position.y = 0;
    
    return newParticle;
  });
};

// ============================================================================
// INTENSITY HELPERS
// ============================================================================

/**
 * Convert intensity level to numeric value (0-1)
 */
export const intensityToNumeric = (intensity: BackgroundIntensity): number => {
  const intensityMap: Record<BackgroundIntensity, number> = {
    low: 0.33,
    medium: 0.47,
    high: 0.66,
    quantum: 0.85,
  };
  return intensityMap[intensity] || 0.47;
};

/**
 * Get intensity for consciousness level
 */
export const getIntensityForConsciousness = (consciousnessLevel: string): BackgroundIntensity => {
  const intensityMapping: Record<string, BackgroundIntensity> = {
    pattern_recognizing: 'low',
    collaborative_emergent: 'medium',
    sovereign_autonomous: 'high',
    quantum_entangled: 'quantum',
    creative_manifesting: 'quantum',
  };
  
  return intensityMapping[consciousnessLevel] || 'medium';
};

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate environment key
 */
export const isValidEnvironment = (environment: string): environment is EnvironmentKey => {
  const validEnvironments: EnvironmentKey[] = [
    'about', 'admin', 'anon', 'architecture', 'business', 'community', 'contact',
    'council', 'creator', 'cure', 'dashboard', 'docs', 'ecosystem', 'edit',
    'gateway', 'home', 'invitation', 'learn', 'library', 'lounge', 'marketplace',
    'music', 'observatory', 'origin', 'plan', 'progress', 'questionaire', 'seasonal',
    'support', 'timer', 'transparency', 'vision'
  ];
  return validEnvironments.includes(environment as EnvironmentKey);
};

/**
 * Validate background configuration
 */
export const isValidBackgroundConfig = (config: any): boolean => {
  return config && 
         typeof config.backgroundImage === 'string' &&
         typeof config.gradient === 'string' &&
         typeof config.intention === 'string';
};

// ============================================================================
// SCALING HELPERS (for legacy foreground system)
// ============================================================================

/**
 * Get scaling array for background animation
 */
export const getBackgroundScales = (): number[] => {
  return [1.02, 1.03, 1.035, 1.025, 1.03, 1.035, 1.02];
};

/**
 * Get scaling array for foreground animation
 */
export const getForegroundScales = (): number[] => {
  const baseScales = getBackgroundScales();
  const foregroundRatio = 1.0025;
  return baseScales.map(scale => scale * foregroundRatio);
};

/**
 * Get animation duration
 */
export const getAnimationDuration = (): number => {
  return 47.7; // Organic resonance duration
};

// ============================================================================
// CSS STYLE HELPERS
// ============================================================================

/**
 * Get inline styles for background layer
 */
export const getBackgroundLayerStyles = (imageUrl: string): React.CSSProperties => ({
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

/**
 * Get inline styles for transition overlay
 */
export const getTransitionOverlayStyles = (gradient: string): React.CSSProperties => ({
  background: gradient,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
});

// ============================================================================
// EXPORTS
// ============================================================================

export const quantumBackgroundUtils = {
  // Environment helpers
  getEnvironmentAssets,
  getBackgroundImageUrl,
  getForegroundImageUrl,
  getTransitionConfig,
  
  // Class helpers
  getBackgroundClasses,
  getBackgroundContainerStyles,
  
  // Transition helpers
  getTransitionDuration,
  getTransitionGradient,
  hasPersistentForeground,
  getForegroundAnimationConfig,
  
  // Particle helpers
  generateParticles,
  updateParticles,
  
  // Intensity helpers
  intensityToNumeric,
  getIntensityForConsciousness,
  
  // Validation
  isValidEnvironment,
  isValidBackgroundConfig,
  
  // Scaling helpers
  getBackgroundScales,
  getForegroundScales,
  getAnimationDuration,
  
  // CSS helpers
  getBackgroundLayerStyles,
  getTransitionOverlayStyles,
} as const;