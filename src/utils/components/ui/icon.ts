// @/utils/components/ui/icon.ts
// ============================================================================
// ICON UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { 
  ICON_SIZES, 
  ICON_COLORS, 
  ICON_INTERACTION, 
  ICON_EFFECTS,
  ICON_ANIMATIONS,
  ICON_SEMANTIC_NAMES 
} from '@/lib/constants/components/ui/icon';

import type { 
  IconVariant, 
  IconStyleProps,
  SemanticIconName 
} from '@/types/components/ui/icon';

/**
 * Get complete style properties for an icon variant
 * PURE: Takes variant, returns style props - no side effects
 */
export const getIconStyles = (variant: IconVariant): IconStyleProps => {
  return {
    size: 'small',
    color: 'quantum_consciousness',
    hoverColor: 'sovereign',
    activeColor: 'focus',
    glow: 'bright',
    animation: ICON_ANIMATIONS[variant]
  };
};

/**
 * Get icon variant from semantic name
 * PURE: Takes semantic name, returns variant - no side effects
 */
export const getIconVariantFromName = (semanticName: SemanticIconName): IconVariant => {
  return ICON_SEMANTIC_NAMES[semanticName];
};

/**
 * Generate CSS classes for icon based on variant and state
 * PURE: Takes variant and state, returns CSS classes - no side effects
 */
export const generateIconClasses = (
  variant: IconVariant,
  state: { isHovered?: boolean; isActive?: boolean } = {}
): string => {
  const baseClasses = `icon icon--${variant}`;
  const stateClasses = [
    state.isHovered ? 'icon--hovered' : '',
    state.isActive ? 'icon--active' : ''
  ].filter(Boolean).join(' ');
  
  return `${baseClasses} ${stateClasses}`.trim();
};

/**
 * Validate icon variant
 * PURE: Takes variant, returns validation - no side effects
 */
export const isValidIconVariant = (variant: string): variant is IconVariant => {
  return Object.keys(ICON_SIZES).includes(variant);
};

/**
 * Get accessibility properties for icon
 * PURE: Takes icon name and variant, returns accessibility props - no side effects
 */
export const getIconAccessibilityProps = (
  name?: string,
  variant?: IconVariant
): { 'aria-label'?: string; role: string } => {
  if (!name) {
    return { role: 'presentation' };
  }
  
  return {
    'aria-label': name,
    role: 'img'
  };
};

/**
 * Merge custom styles with variant styles
 * PURE: Takes variant styles and custom styles, returns merged styles - no side effects
 */
export const mergeIconStyles = (
  variantStyles: IconStyleProps,
  customStyles?: Partial<IconStyleProps>
): IconStyleProps => {
  return {
    ...variantStyles,
    ...customStyles
  };
};