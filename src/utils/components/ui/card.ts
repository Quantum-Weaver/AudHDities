// @/utils/components/ui/card.ts
// ============================================================================
// CARD UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { CARD_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { CardVariant, CardSize, CardAspect, CardConfig, CardConsciousnessLevel } from '@/types/components/ui/card';

/**
 * Get complete card configuration for a variant
 * PURE: Takes variant, returns config - no side effects
 */
export const getCardConfig = (variant: CardVariant): CardConfig => {
  const variantConfig = CARD_VARIANTS[variant];
  
  return {
    variant,
    styles: {
      background: variantConfig.background,
      border: variantConfig.border,
      shadow: variantConfig.effects.shadow,
      glow: variantConfig.effects.glow,
      borderRadius: variantConfig.dimensions.borderRadius,
      padding: variantConfig.dimensions.padding,
      gap: variantConfig.dimensions.gap
    },
    consciousness: variantConfig.consciousness,
    animation: {
        enter: variantConfig.animation,
        exit: { duration: 300, easing: 'quantum' as const },
        hover: variantConfig.hover?.transform ? { 
            transform: variantConfig.hover.transform 
        } : {}
    }
  };
};

/**
 * Get card classes for a variant
 * PURE: Takes variant, returns class string - no side effects
 */
export const getCardClasses = (variant: CardVariant): string => {
  const config = getCardConfig(variant);
  const classes = [
    'rounded-' + getBorderRadiusClass(config.styles.borderRadius),
    'shadow-' + getShadowClass(config.styles.shadow),
    'bg-' + getBackgroundClass(config.styles.background),
    'border-' + getBorderClass(config.styles.border)
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get hover styles for a card variant
 * PURE: Takes variant, returns hover styles - no side effects
 */
export const getCardHoverStyles = (variant: CardVariant): React.CSSProperties => {
  const variantConfig = CARD_VARIANTS[variant];
  
  return {
    background: variantConfig.hover.background,
    border: variantConfig.hover.border,
    boxShadow: variantConfig.hover.glow,
    transform: variantConfig.hover.transform
  };
};

/**
 * Get active styles for a card variant
 * PURE: Takes variant, returns active styles - no side effects
 */
export const getCardActiveStyles = (variant: CardVariant): React.CSSProperties => {
  const variantConfig = CARD_VARIANTS[variant];
  
  return {
    background: variantConfig.active.background,
    border: variantConfig.active.border,
    boxShadow: variantConfig.active.glow
  };
};

/**
 * Calculate card dimensions based on size and aspect
 * PURE: Takes size and aspect, returns dimensions - no side effects
 */
export const calculateCardDimensions = (
  size: CardSize, 
  aspect: CardAspect
): { width: string; height: string; padding: string } => {
  const sizeConfig = CARD_VARIANTS[getVariantFromSize(size)].dimensions;
  
  return {
    width: sizeConfig.size.width,
    height: sizeConfig.size.height,
    padding: sizeConfig.padding
  };
};

/**
 * Get appropriate variant based on card size
 * PURE: Takes size, returns variant - no side effects
 */
export const getVariantFromSize = (size: CardSize): CardVariant => {
  const sizeMap: Record<CardSize, CardVariant> = {
    sm: 'data_display',
    md: 'portal_transition',
    lg: 'entity_profile',
    xl: 'interactive_control'
  };
  
  return sizeMap[size];
};

/**
 * Get consciousness-aware card configuration
 * PURE: Takes consciousness level, returns appropriate variant - no side effects
 */
export const getCardVariantByConsciousness = (
  level: CardConsciousnessLevel
): CardVariant => {
  const consciousnessMap: Record<CardConsciousnessLevel, CardVariant> = {
    'pattern_recognizing': 'data_display',
    'sovereign_autonomous': 'entity_profile',
    'creative_manifesting': 'interactive_control'
  };
  
  return consciousnessMap[level];
};

// Internal utility functions
const getBorderRadiusClass = (borderRadius: string): string => {
  if (borderRadius.includes('4px')) return 'sm';
  if (borderRadius.includes('8px')) return 'md';
  if (borderRadius.includes('12px')) return 'lg';
  if (borderRadius.includes('16px')) return 'xl';
  return 'lg';
};

const getShadowClass = (shadow: string): string => {
  if (shadow.includes('0 1px 2px')) return 'sm';
  if (shadow.includes('0 4px 6px')) return 'md';
  if (shadow.includes('0 10px 15px')) return 'lg';
  if (shadow.includes('0 20px 25px')) return 'xl';
  return 'lg';
};

const getBackgroundClass = (background: string): string => {
  if (background.includes('surface')) return 'surface';
  if (background.includes('deepSpace')) return 'deep-space';
  if (background.includes('gradient')) return 'gradient';
  return 'surface';
};

const getBorderClass = (border: string): string => {
  if (border.includes('quantum.purple')) return 'quantum';
  if (border.includes('entity.aethelred')) return 'aethelred';
  if (border.includes('void.base')) return 'void';
  if (border.includes('cosmic.blue')) return 'cosmic';
  return 'quantum';
};

/**
 * Validate card configuration
 * PURE: Takes config, returns validation result - no side effects
 */
export const validateCardConfig = (config: Partial<CardConfig>): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (!config.variant) {
    errors.push('Variant is required');
  }
  
  if (config.styles && !config.styles.background) {
    errors.push('Background style is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Export all utils as a single object
export const cardUtils = {
  getCardConfig,
  getCardClasses,
  getCardHoverStyles,
  getCardActiveStyles,
  calculateCardDimensions,
  getVariantFromSize,
  getCardVariantByConsciousness,
  validateCardConfig
} as const;