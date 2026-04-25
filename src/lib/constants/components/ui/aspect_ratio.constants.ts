// src/lib/constants/components/ui/aspect_ratio.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ASPECT RATIO CONSTANTS                                 ║
// ║                    Single source of truth — ratios, sizes, mappings       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { CONTAINER_DIMENSIONS, BORDER_RADII } from '@/lib/constants/cosmic';

// ─── Aspect Ratio Values ────────────────────────────────────────────────────
export const ASPECT_RATIO_VALUES = {
  SQUARE: '1/1',
  STANDARD: '4/3',
  CLASSIC: '3/2',
  WIDESCREEN: '16/9',
  ULTRAWIDE: '21/9',
  PORTRAIT_PHOTO: '2/3',
  CLASSIC_PORTRAIT: '3/4',
  VERTICAL_VIDEO: '9/16',
  GOLDEN: 'golden',
  CINEMA: 'cinema',
  CUSTOM: 'custom',
} as const;

export type AspectRatioValue =
  (typeof ASPECT_RATIO_VALUES)[keyof typeof ASPECT_RATIO_VALUES];

// ─── Ratio to Percentage Mapping ────────────────────────────────────────────
/** Maps each aspect ratio to its CSS padding-bottom percentage */
export const ASPECT_RATIO_PERCENTAGES: Record<AspectRatioValue, number> = {
  [ASPECT_RATIO_VALUES.SQUARE]: 100,           // 1/1 → 100%
  [ASPECT_RATIO_VALUES.STANDARD]: 75,           // 4/3 → 75%
  [ASPECT_RATIO_VALUES.CLASSIC]: 66.667,        // 3/2 → 66.667%
  [ASPECT_RATIO_VALUES.WIDESCREEN]: 56.25,       // 16/9 → 56.25%
  [ASPECT_RATIO_VALUES.ULTRAWIDE]: 42.857,       // 21/9 → 42.857%
  [ASPECT_RATIO_VALUES.PORTRAIT_PHOTO]: 150,     // 2/3 → 150%
  [ASPECT_RATIO_VALUES.CLASSIC_PORTRAIT]: 133.333, // 3/4 → 133.333%
  [ASPECT_RATIO_VALUES.VERTICAL_VIDEO]: 177.778,  // 9/16 → 177.778%
  [ASPECT_RATIO_VALUES.GOLDEN]: 61.803,           // golden ratio → 61.803%
  [ASPECT_RATIO_VALUES.CINEMA]: 42.553,           // CinemaScope → 42.553%
  [ASPECT_RATIO_VALUES.CUSTOM]: 0,                // custom — computed at runtime
};

// ─── Object Fit Values ──────────────────────────────────────────────────────
export const OBJECT_FIT_VALUES = {
  COVER: 'cover',
  CONTAIN: 'contain',
  FILL: 'fill',
  NONE: 'none',
  SCALE_DOWN: 'scale-down',
} as const;

export type ObjectFit = (typeof OBJECT_FIT_VALUES)[keyof typeof OBJECT_FIT_VALUES];

// ─── Object Fit Class Mapping ───────────────────────────────────────────────
export const OBJECT_FIT_CLASSES: Record<ObjectFit, string> = {
  [OBJECT_FIT_VALUES.COVER]: 'object-cover',
  [OBJECT_FIT_VALUES.CONTAIN]: 'object-contain',
  [OBJECT_FIT_VALUES.FILL]: 'object-fill',
  [OBJECT_FIT_VALUES.NONE]: 'object-none',
  [OBJECT_FIT_VALUES.SCALE_DOWN]: 'object-scale-down',
};

// ─── Rounded Sizes ──────────────────────────────────────────────────────────
export const ASPECT_RATIO_ROUNDED_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  FULL: 'full',
} as const;

export type AspectRatioRoundedSize =
  (typeof ASPECT_RATIO_ROUNDED_SIZES)[keyof typeof ASPECT_RATIO_ROUNDED_SIZES];

/** Maps rounded size keys to Tailwind rounded classes from COSMIC radii */
export const ROUNDED_SIZE_CLASSES: Record<AspectRatioRoundedSize, string> = {
  [ASPECT_RATIO_ROUNDED_SIZES.SM]: 'rounded-md',
  [ASPECT_RATIO_ROUNDED_SIZES.MD]: 'rounded-lg',
  [ASPECT_RATIO_ROUNDED_SIZES.LG]: 'rounded-xl',
  [ASPECT_RATIO_ROUNDED_SIZES.XL]: 'rounded-2xl',
  [ASPECT_RATIO_ROUNDED_SIZES.FULL]: 'rounded-full',
};

// ─── Container Base Classes ─────────────────────────────────────────────────
export const ASPECT_RATIO_CONTAINER_BASE = [
  'relative',
  'w-full',
  'overflow-hidden',
] as const;

// ─── Inner Content Base Classes ─────────────────────────────────────────────
export const ASPECT_RATIO_INNER_BASE = [
  'absolute',
  'inset-0',
] as const;

// ─── Media Classes ──────────────────────────────────────────────────────────
export const ASPECT_RATIO_MEDIA_BASE = [
  'w-full',
  'h-full',
] as const;

// ─── Border ─────────────────────────────────────────────────────────────────
export const ASPECT_RATIO_BORDER_CLASS = 'border border-white/10';

// ─── Transition ─────────────────────────────────────────────────────────────
export const ASPECT_RATIO_TRANSITION = 'transition-all duration-300';

// ─── Empty fallback background ──────────────────────────────────────────────
export const ASPECT_RATIO_FALLBACK_BG = 'bg-surface/50';