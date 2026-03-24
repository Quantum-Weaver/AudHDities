// src/utils/cosmic/effects.ts - PURE LOGIC ONLY
import { 
  DESIGN_EFFECTS,
  GLOW_EFFECTS,
  SHADOWS,
  HOLOGRAPHIC_EFFECTS,
  BACKDROP_EFFECTS,
  GRADIENT_EFFECTS 
} from '@/lib/constants/cosmic/effects';
import { AnimationPreset } from '@/types/cosmic/motion'
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import type {
  EffectType,
  DesignTokenCategory,
  GradientIntensity,
  EffectIntensity,
  EffectSpread,
  BlurIntensity,
  AnimationConfig
} from '@/types/cosmic/primitives';

import type {
  VisualEffect,
  DesignToken
} from '@/types/cosmic/design';

// ============================================================================
// EFFECT UTILITY FUNCTIONS - PURE LOGIC
// ============================================================================

/**
 * Generate quantum glow effect based on color and intensity
 */
export const generateQuantumGlow = (
  color: string,
  intensity: EffectIntensity = 0.5,
  spread: EffectSpread = 20
): string => {
  const intensityMap: Record<EffectIntensity, string> = {
    0.25: '10',
    0.5: '20',
    0.75: '30',
    1: '40'
  };

  const glowSize = intensityMap[intensity] || '20';
  const opacity = Math.round(intensity * 40);
  
  return `0 0 ${spread}px ${color}${opacity}, 0 0 ${spread * 2}px ${color}${Math.round(opacity * 0.75)}, 0 0 ${spread * 3}px ${color}${Math.round(opacity * 0.5)}`;
};

/**
 * Create holographic scan effect styles
 */
export const createHolographicStyles = (
  baseColor: string = QUANTUM_COLORS.neurospark,
  intensity: EffectIntensity = 0.5
): string => {
  const opacity = Math.round(intensity * 10);
  return `
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent 45%,
        ${baseColor}${opacity} 50%,
        transparent 55%
      );
      animation: holographicScan 3s linear infinite;
      pointer-events: none;
    }
    
    @keyframes holographicScan {
      0% { transform: translateY(-100%) rotate(45deg); }
      100% { transform: translateY(100%) rotate(45deg); }
    }
  `;
};

/**
 * Get predefined glow effect by type
 */
export const getGlowEffect = (glowType: keyof typeof GLOW_EFFECTS): string => {
  return GLOW_EFFECTS[glowType];
};

/**
 * Apply backdrop effect with optional customization
 */
export const applyBackdrop = (
  effectType: keyof typeof BACKDROP_EFFECTS,
  blur: BlurIntensity = 16,
  opacity: number = 0.8
): string => {
  const baseEffect = BACKDROP_EFFECTS[effectType];
  
  // Customize blur and opacity
  return baseEffect
    .replace(/blur\(\d+px\)/, `blur(${blur}px)`)
    .replace(/background: [^;]+/, `background: ${QUANTUM_COLORS.surface}${Math.round(opacity * 100)}`);
};

/**
 * Create animated gradient background
 */
export const createAnimatedGradient = (
  colors: string[],
  duration: number = 3,
  direction: 'x' | 'y' | 'radial' = 'x'
): string => {
  const gradient = `linear-gradient(${
    direction === 'x' ? '90deg' : direction === 'y' ? '180deg' : '45deg'
  }, ${colors.join(', ')})`;
  
  return `
    background: ${gradient};
    background-size: ${direction === 'radial' ? '400% 400%' : '200% 200%'};
    animation: gradientShift ${duration}s ease infinite;
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
};

/**
 * Create shadow effect with depth and glow
 */
export const createShadowEffect = (
  shadowType: keyof typeof SHADOWS,
  glowType?: keyof typeof GLOW_EFFECTS
): string => {
  const shadow = SHADOWS[shadowType];
  const glow = glowType ? GLOW_EFFECTS[glowType] : '';
  
  return glow ? `${shadow}, ${glow}` : shadow;
};

/**
 * Generate border gradient effect
 */
export const createBorderGradient = (
  gradient: string,
  width: number = 2
): string => {
  return `
    border: ${width}px solid transparent;
    background: 
      linear-gradient(${QUANTUM_COLORS.deepSpace}, ${QUANTUM_COLORS.deepSpace}) padding-box,
      ${gradient} border-box;
  `;
};

/**
 * Apply multiple effects with proper layering
 */
export const composeEffects = (
  effects: Array<{
    type: EffectType;
    config: Record<string, any>;
  }>
): string => {
  return effects.map(effect => {
    switch (effect.type) {
      case 'glow_consciousness':
        return generateQuantumGlow(
          effect.config.color,
          effect.config.intensity,
          effect.config.spread
        );
      case 'shadow_depth':
        return createShadowEffect(
          effect.config.shadowType,
          effect.config.glowType
        );
      case 'backdrop_isolation':
        return applyBackdrop(
          effect.config.effectType,
          effect.config.blur,
          effect.config.opacity
        );
      case 'gradient_transition':
        return createAnimatedGradient(
          effect.config.colors,
          effect.config.duration,
          effect.config.direction
        );
      default:
        return '';
    }
  }).join('; ');
};

/**
 * Validate effect configuration
 */
export const validateEffectConfig = (config: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (config.intensity && (config.intensity < 0 || config.intensity > 1)) {
    errors.push('Effect intensity must be between 0 and 1');
  }

  if (config.colors && !Array.isArray(config.colors)) {
    errors.push('Colors must be an array');
  }

  if (config.duration && config.duration <= 0) {
    errors.push('Duration must be positive');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Create animated glow effect with motion integration
 */
export const createAnimatedGlow = (
  color: string,
  animationConfig: AnimationConfig
): string => {
  const glow = generateQuantumGlow(color, 0.7, 20);
  
  return `
    box-shadow: ${glow};
    animation: animatedGlow ${animationConfig.duration}ms ${animationConfig.easing} ${animationConfig.repeat || 'infinite'};
    
    @keyframes animatedGlow {
      0% { box-shadow: ${glow.replace('40', '20').replace('30', '15').replace('20', '10')}; }
      50% { box-shadow: ${glow}; }
      100% { box-shadow: ${glow.replace('40', '20').replace('30', '15').replace('20', '10')}; }
    }
  `;
};

/**
 * Create holographic effect with motion synchronization
 */
export const createSynchronizedHolographic = (
  baseColor: string,
  motionSystem: AnimationPreset[]
): string => {
  const holographic = createHolographicStyles(baseColor, 0.8);
  const quantumPulse = motionSystem[0]?.entrance;
  
  return `
    ${holographic}
    animation-duration: ${quantumPulse?.duration || 3000}ms;
    animation-timing-function: ${quantumPulse?.easing || 'linear'};
  `;
};

/**
 * Generate CSS custom properties for effects
 */
export const generateEffectCSSVariables = (
  effects: Record<string, string>
): string => {
  return Object.entries(effects)
    .map(([key, value]) => `--effect-${key}: ${value};`)
    .join('\n');
};