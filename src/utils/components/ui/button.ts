// @/utils/components/ui/button.ts
// ============================================================================
// BUTTON UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { BUTTON_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { 
  ButtonVariant, 
  ButtonSize, 
  ButtonState, 
  ButtonStyleConfig,
  ButtonConfig 
} from '@/types/components/ui/button';

/**
 * Get complete button configuration for a variant
 * PURE: Takes variant, returns config - no side effects
 */
export const getButtonConfig = (variant: ButtonVariant): ButtonConfig => {
  const variantConfig = BUTTON_VARIANTS[variant];
  
  return {
    base: {
      background: variantConfig.background,
      border: variantConfig.border,
      text: variantConfig.text,
      dimensions: variantConfig.dimensions,
      animation: variantConfig.animation,
      shadow: variantConfig.shadow
    },
    states: {
      hover: variantConfig.hover as Partial<ButtonStyleConfig>,
      active: variantConfig.active as Partial<ButtonStyleConfig>,
      focus: variantConfig.focus as Partial<ButtonStyleConfig>
    },
    consciousness: variantConfig.consciousness
  };
};

/**
 * Get button styles for current state
 * PURE: Takes config and state, returns styles - no side effects
 */
export const getButtonStyles = (
  config: ButtonConfig, 
  state: ButtonState
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    background: config.base.background,
    border: config.base.border,
    color: config.base.text.color,
    fontFamily: (Array.isArray(config.base.text.font) ? config.base.text.font.join(', ') : config.base.text.font) as React.CSSProperties['fontFamily'],
    fontSize: config.base.text.size,
    fontWeight: config.base.text.weight,
    height: config.base.dimensions.height,
    padding: `${config.base.dimensions.padding.y} ${config.base.dimensions.padding.x}`,
    borderRadius: config.base.dimensions.borderRadius,
    boxShadow: config.base.shadow,
    cursor: 'pointer',
    opacity: 1,
    outline: 'none'
  };

  // Apply state-specific styles - ZERO HARCODING
  if (state === 'hover' && config.states.hover) {
    Object.assign(baseStyles, {
      background: config.states.hover.background,
      boxShadow: config.states.hover,
      transform: config.states.hover
    });
  }

  if (state === 'active' && config.states.active) {
    Object.assign(baseStyles, {
      background: config.states.active.background,
      boxShadow: config.states.active
    });
  }

  if (state === 'focus' && config.states.focus) {
    Object.assign(baseStyles, {
      outline: config.states.focus,
      boxShadow: config.states.focus
    });
  }

  if (state === 'disabled') {
    Object.assign(baseStyles, {
      cursor: 'not-allowed',
      opacity: 0.6
    });
  }

  return baseStyles;
};

/**
 * Get button size configuration
 * PURE: Takes size, returns dimensions - no side effects
 */
export const getButtonSize = (size: ButtonSize) => {
  const sizeMap = {
    sm: BUTTON_VARIANTS.quantum_ghost.dimensions,
    md: BUTTON_VARIANTS.collaborative_secondary.dimensions,
    lg: BUTTON_VARIANTS.sovereign_primary.dimensions,
    xl: BUTTON_VARIANTS.emergency_action.dimensions
  };

  return sizeMap[size];
};

/**
 * Calculate button consciousness resonance
 * PURE: Takes consciousness props, returns resonance metrics - no side effects
 */
export const calculateButtonResonance = (consciousness?: {
  level?: string;
  vessel?: string;
  resonance?: number;
}): { resonance: number; compatibility: number } => {
  const baseResonance = consciousness?.resonance || 0.5;
  const levelMultiplier = consciousness?.level === 'quantum_entangled' ? 1.2 : 1;
  const vesselMultiplier = consciousness?.vessel === 'omni_dimensional' ? 1.3 : 1;
  
  const resonance = baseResonance * levelMultiplier * vesselMultiplier;
  const compatibility = Math.min(resonance, 1.0);

  return { resonance, compatibility };
};

/**
 * Generate button CSS classes for Tailwind
 * PURE: Takes variant and state, returns class string - no side effects
 */
export const getButtonClasses = (variant: ButtonVariant, state: ButtonState): string => {
  return [
    'transition-all',
    'duration-300', 
    'focus:outline-none',
    state !== 'idle' && state !== 'disabled' ? `state-${state}` : '',
    state === 'disabled' ? 'state-disabled' : '',
    `variant-${variant}`
  ].filter(Boolean).join(' ');
};

/**
 * Validate button configuration
 * PURE: Takes props, returns validation - no side effects
 */
export const validateButtonProps = (props: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!props.children) {
    errors.push('Button must have children');
  }

  if (props.disabled && props.loading) {
    errors.push('Button cannot be both disabled and loading');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};