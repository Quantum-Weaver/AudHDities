// src/lib/constants/components/forging/slider.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SLIDER CONSTANTS                                       ║
// ║                    Pure values derived from COSMIC tokens                 ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';
import { FONT_SIZES } from '@/lib/constants/cosmic/dimensions';

// ─── Color References ──────────────────────────────────────────────────────
const starDust = QUANTUM_COLORS['starDust'];       // #E0E0E0
const quantumPurple = QUANTUM_COLORS['quantum.purple']; // #6C5CE7
const cosmicBlue = QUANTUM_COLORS['cosmic.blue'];    // #0984E3
const fireBase = QUANTUM_COLORS['fire.base'];        // #E17055
const sanctuaryGreen = QUANTUM_COLORS['sanctuary.green']; // #00B894

// ============================================================================
// SLIDER VARIANTS
// ============================================================================

export const SLIDER_VARIANTS = {
  DEFAULT: 'default',
  QUANTUM: 'quantum',
  COSMIC: 'cosmic',
  FIRE: 'fire',
  SANCTUARY: 'sanctuary',
} as const;

export type SliderVariant = (typeof SLIDER_VARIANTS)[keyof typeof SLIDER_VARIANTS];

// ============================================================================
// SLIDER SIZES
// ============================================================================

export const SLIDER_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type SliderSize = (typeof SLIDER_SIZES)[keyof typeof SLIDER_SIZES];

// ============================================================================
// RANGE (FILL) COLOR CLASSES
// ============================================================================

export const SLIDER_RANGE_COLOR_CLASSES: Record<SliderVariant, string> = {
  default: `bg-[${quantumPurple}]`,
  quantum: `bg-[${quantumPurple}]`,
  cosmic: `bg-[${cosmicBlue}]`,
  fire: `bg-[${fireBase}]`,
  sanctuary: `bg-[${sanctuaryGreen}]`,
};

// ============================================================================
// VALUE DISPLAY COLOR CLASSES
// ============================================================================

export const SLIDER_VALUE_COLOR_CLASSES: Record<SliderVariant, string> = {
  default: `text-[${quantumPurple}]`,
  quantum: `text-[${quantumPurple}]`,
  cosmic: `text-[${cosmicBlue}]`,
  fire: `text-[${fireBase}]`,
  sanctuary: `text-[${sanctuaryGreen}]`,
};

// ============================================================================
// FOCUS RING COLOR CLASSES
// ============================================================================

export const SLIDER_FOCUS_COLOR_CLASSES: Record<SliderVariant, string> = {
  default: `focus-visible:ring-[${quantumPurple}]/50`,
  quantum: `focus-visible:ring-[${quantumPurple}]/50`,
  cosmic: `focus-visible:ring-[${cosmicBlue}]/50`,
  fire: `focus-visible:ring-[${fireBase}]/50`,
  sanctuary: `focus-visible:ring-[${sanctuaryGreen}]/50`,
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
// THUMB SIZE CLASSES (Tailwind)
// ============================================================================

export const SLIDER_THUMB_SIZE_CLASSES: Record<SliderSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

// ============================================================================
// THUMB PIXEL SIZE (for positioning calculations)
// ============================================================================

export const SLIDER_THUMB_PIXEL_SIZE: Record<SliderSize, number> = {
  sm: 12,
  md: 16,
  lg: 20,
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
// LABEL COLOR CLASSES
// ============================================================================

export const SLIDER_LABEL_COLOR_CLASS = `text-[${starDust}]/80`;
export const SLIDER_HELPER_TEXT_COLOR_CLASS = `text-[${starDust}]/40`;

// ============================================================================
// TRACK BACKGROUND
// ============================================================================

export const SLIDER_TRACK_BG_CLASS = `bg-[${starDust}]/10`;

// ============================================================================
// MARKS COLOR
// ============================================================================

export const SLIDER_MARK_COLOR_CLASS = `bg-[${starDust}]/20`;

export const SLIDER_THUMB_BASE_CLASSES = [
  'block',
  'rounded-full',
  'border',
  `border-[${starDust}]/20`,
  `bg-[${starDust}]`,
  'shadow-lg',
  'transition-colors',
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'disabled:pointer-events-none',
  'disabled:opacity-50',
] as const;

// ============================================================================
// CONTAINER SPACING
// ============================================================================

export const SLIDER_CONTAINER_SPACING = 'space-y-2';
export const SLIDER_TRACK_CONTAINER_SPACING = 'py-2';

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export const DEFAULT_SLIDER_VARIANT = SLIDER_VARIANTS.DEFAULT;
export const DEFAULT_SLIDER_SIZE = SLIDER_SIZES.MD;
export const DEFAULT_SLIDER_MIN = 0;
export const DEFAULT_SLIDER_MAX = 100;
export const DEFAULT_SLIDER_STEP = 1;