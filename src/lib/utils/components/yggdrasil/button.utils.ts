// src/lib/utils/components/yggdrasil/button.utils.ts
// Pure logic only - derived from cosmic constants

import type { ButtonVariant, ButtonSize } from '@/types/components/yggdrasil/button.types';
import { 
  BUTTON_ICON_SIZE_MAP, 
  BUTTON_LOADING_SPINNER_COLORS,
  BUTTON_VARIANTS_KEYS,
  BUTTON_SIZES_KEYS,
} from '@/lib/constants/components/yggdrasil/button.constants';

// ============================================================================
// ICON SIZE UTILITIES
// ============================================================================

/**
 * Get the appropriate icon size in pixels for a given button size
 * Derived from BUTTON_ICON_SIZE_MAP constant
 */
export function getButtonIconSize(size: ButtonSize): number {
  return BUTTON_ICON_SIZE_MAP[size] || BUTTON_ICON_SIZE_MAP.md;
}

/**
 * Get icon size as Tailwind class (w-4, h-4, etc.)
 */
export function getButtonIconSizeClass(size: ButtonSize): string {
  const pixelSize = getButtonIconSize(size);
  // Convert pixel size to Tailwind class (assuming 4px base unit)
  const tailwindSize = pixelSize / 4;
  return `w-${tailwindSize} h-${tailwindSize}`;
}

// ============================================================================
// LOADING SPINNER UTILITIES
// ============================================================================

/**
 * Get the appropriate spinner color class for a given button variant
 * Derived from BUTTON_LOADING_SPINNER_COLORS constant
 */
export function getLoadingSpinnerColor(variant: ButtonVariant): string {
  return BUTTON_LOADING_SPINNER_COLORS[variant] || BUTTON_LOADING_SPINNER_COLORS.primary;
}

/**
 * Map button variant to Spinner component variant
 */
export function getLoadingSpinnerVariant(variant: ButtonVariant): 'default' | 'primary' | 'success' | 'warning' | 'purple' | 'white' {
  const variantMap: Record<ButtonVariant, 'default' | 'primary' | 'success' | 'warning' | 'purple' | 'white'> = {
    primary: 'primary',
    secondary: 'primary',
    outline: 'purple',
    ghost: 'default',
    destructive: 'warning',
    success: 'success',
    warning: 'warning',
    link: 'primary',
    glass: 'white',
    glow: 'purple',
  };
  return variantMap[variant] || 'default';
}

// ============================================================================
// ACCESSIBILITY UTILITIES
// ============================================================================

/**
 * Get appropriate ARIA label for a button based on its state and content
 */
export function getButtonAriaLabel({
  loading,
  disabled,
  iconOnly,
  children,
  defaultLabel,
}: {
  loading?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
  children?: React.ReactNode;
  defaultLabel?: string;
}): string | undefined {
  if (loading) return 'Loading, please wait';
  if (disabled) return 'Button disabled';
  if (iconOnly && typeof children === 'string') return children;
  if (iconOnly && defaultLabel) return defaultLabel;
  return undefined;
}

/**
 * Get loading announcement for screen readers
 */
export function getLoadingAnnouncement(isLoading: boolean, loadingText?: string): string | undefined {
  if (isLoading) {
    return loadingText || 'Loading';
  }
  return undefined;
}

// ============================================================================
// BUTTON GROUP UTILITIES
// ============================================================================

/**
 * Get spacing classes for button groups based on orientation
 */
export function getButtonGroupSpacing(
  orientation: 'horizontal' | 'vertical',
  spaced: boolean
): string {
  if (!spaced) return '';
  if (orientation === 'horizontal') return 'gap-2';
  return 'space-y-2';
}

/**
 * Get border radius adjustments for buttons in a group (to avoid double borders)
 */
export function getButtonGroupRadiusClass(
  index: number,
  total: number,
  orientation: 'horizontal' | 'vertical'
): string {
  if (orientation === 'horizontal') {
    if (total === 1) return 'rounded-lg';
    if (index === 0) return 'rounded-l-lg rounded-r-none';
    if (index === total - 1) return 'rounded-r-lg rounded-l-none';
    return 'rounded-none';
  } else {
    if (total === 1) return 'rounded-lg';
    if (index === 0) return 'rounded-t-lg rounded-b-none';
    if (index === total - 1) return 'rounded-b-lg rounded-t-none';
    return 'rounded-none';
  }
}

// ============================================================================
// CONSCIOUSNESS-AWARE BUTTON UTILITIES
// ============================================================================

/**
 * Get recommended button variant based on user tier and consciousness level
 */
export function getRecommendedVariantForTier(
  tier: 'community' | 'ally' | 'corporate' | 'council'
): ButtonVariant {
  const tierVariantMap: Record<string, ButtonVariant> = {
    community: BUTTON_VARIANTS_KEYS.SECONDARY,
    ally: BUTTON_VARIANTS_KEYS.PRIMARY,
    corporate: BUTTON_VARIANTS_KEYS.GLOW,
    council: BUTTON_VARIANTS_KEYS.GLASS,
  };
  return tierVariantMap[tier] || BUTTON_VARIANTS_KEYS.PRIMARY;
}

/**
 * Get animation configuration based on vessel capacity
 */
export function getButtonAnimationConfig(vesselCapacity: string): {
  duration: number;
  easing: string;
} {
  const configMap: Record<string, { duration: number; easing: string }> = {
    single: { duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    multi_stream: { duration: 200, easing: 'cubic-bezier(0.2, 0.9, 0.4, 1.1)' },
    omni_dimensional: { duration: 300, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
    quantum_weaver: { duration: 400, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  };
  return configMap[vesselCapacity] || configMap.single;
}