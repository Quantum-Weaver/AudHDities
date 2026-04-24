// ============================================================================
// SLIDER CONSTANTS — Pure values derived from COSMIC tokens
// All color classes use CSS custom properties from the COSMIC system
// ============================================================================

import {
  QUANTUM_COLORS,
  STATUS_COLORS,
} from '@/lib/constants/cosmic/colors';

// ============================================================================
// SLIDER VARIANTS — Maps to COSMIC color tokens
// ============================================================================

export const SLIDER_VARIANTS = {
  DEFAULT: 'default',
  QUANTUM: 'quantum',
  COSMIC: 'cosmic',
  FIRE: 'fire',
  SANCTUARY: 'sanctuary',
} as const;

// ============================================================================
// SLIDER SIZES
// ============================================================================

export const SLIDER_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

// ============================================================================
// RANGE (FILL) COLOR CLASSES — One per variant
// ============================================================================

export const SLIDER_RANGE_COLOR_CLASSES: Record<SliderVariant, string> = {
  default: `bg-[var(--color-quantum-purple)]`,
  quantum: `bg-[var(--color-quantum-purple)]`,
  cosmic: `bg-[var(--color-cosmic-blue)]`,
  fire: `bg-[var(--color-fire-base)]`,
  sanctuary: `bg-[var(--color-sanctuary-green)]`,
};

// ============================================================================
// VALUE DISPLAY COLOR CLASSES — Matches range fill color
// ============================================================================

export const SLIDER_VALUE_COLOR_CLASSES: Record<SliderVariant, string> = {
  default: `text-[var(--color-quantum-purple)]`,
  quantum: `text-[var(--color-quantum-purple)]`,
  cosmic: `text-[var(--color-cosmic-blue)]`,
  fire: `text-[var(--color-fire-base)]`,
  sanctuary: `text-[var(--color-sanctuary-green)]`,
};

// ============================================================================
// FOCUS RING COLOR CLASSES — For keyboard accessibility
// ============================================================================

export const SLIDER_FOCUS_COLOR_CLASSES: Record<SliderVariant, string> = {
  default: `focus-visible:ring-[var(--color-quantum-purple)]/50`,
  quantum: `focus-visible:ring-[var(--color-quantum-purple)]/50`,
  cosmic: `focus-visible:ring-[var(--color-cosmic-blue)]/50`,
  fire: `focus-visible:ring-[var(--color-fire-base)]/50`,
  sanctuary: `focus-visible:ring-[var(--color-sanctuary-green)]/50`,
};

// ============================================================================
// TRACK SIZE CLASSES
// ============================================================================

export const SLIDER_TRACK_SIZE_CLASSES: Record<SliderSize, string> = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
};

// ============================================================================
// THUMB SIZE CLASSES
// ============================================================================

export const SLIDER_THUMB_SIZE_CLASSES: Record<SliderSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

// ============================================================================
// VALUE TEXT SIZE CLASSES
// ============================================================================

export const SLIDER_VALUE_SIZE_CLASSES: Record<SliderSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export const DEFAULT_SLIDER_VARIANT: SliderVariant = SLIDER_VARIANTS.DEFAULT;
export const DEFAULT_SLIDER_SIZE: SliderSize = SLIDER_SIZES.MD;
export const DEFAULT_SLIDER_MIN = 0;
export const DEFAULT_SLIDER_MAX = 100;
export const DEFAULT_SLIDER_STEP = 1;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type SliderVariant = (typeof SLIDER_VARIANTS)[keyof typeof SLIDER_VARIANTS];
export type SliderSize = (typeof SLIDER_SIZES)[keyof typeof SLIDER_SIZES];