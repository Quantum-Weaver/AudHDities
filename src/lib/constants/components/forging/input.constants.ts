// src/lib/constants/components/forging/input.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    INPUT CONSTANTS                                        ║
// ║                    Sizing, padding, icon offsets                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';

// ─── Input Heights ─────────────────────────────────────────────────────────
/** Height values per size variant — derived from spacing scale */
export const INPUT_HEIGHT = {
  sm: SPACING_SCALE['7'],   // 28px
  md: SPACING_SCALE['8'],   // 32px
  lg: SPACING_SCALE['10'],  // 40px
} as const;

// ─── Input Padding ─────────────────────────────────────────────────────────
/** Horizontal and vertical padding per size */
export const INPUT_PADDING = {
  sm: { x: SPACING_SCALE['2'], y: SPACING_SCALE['1'] },    // px-2 py-1
  md: { x: SPACING_SCALE['3'], y: SPACING_SCALE['2'] },    // px-3 py-2
  lg: { x: SPACING_SCALE['4'], y: SPACING_SCALE['3'] },    // px-4 py-3
} as const;

// ─── Icon Positioning ──────────────────────────────────────────────────────
/** Left/right offset for icon positioning */
export const INPUT_ICON_OFFSET = {
  LEFT: 'left-3',
  RIGHT: 'right-3',
} as const;

/** Padding to accommodate icons */
export const INPUT_ICON_PADDING = {
  LEFT: 'pl-9',
  RIGHT: 'pr-9',
  BOTH: 'pl-9 pr-9',
} as const;

// ─── Base Classes ──────────────────────────────────────────────────────────
/** Base classes applied to all input variants */
export const INPUT_BASE_CLASSES = [
  'rounded-lg',
  'border',
  'bg-transparent',
  'transition-all',
  'duration-200',
  'outline-none',
  'placeholder:text-star-dust/40',
  'disabled:cursor-not-allowed',
  'disabled:opacity-50',
] as const;

// ─── Label Classes ─────────────────────────────────────────────────────────
export const INPUT_LABEL_CLASSES = 'text-sm font-medium text-star-dust/80' as const;
export const INPUT_LABEL_ERROR_CLASSES = 'text-red-400' as const;

// ─── Helper/Error Text ─────────────────────────────────────────────────────
export const INPUT_HELPER_CLASSES = 'text-xs text-star-dust/40' as const;
export const INPUT_ERROR_CLASSES = 'text-xs text-red-400' as const;

// ─── Required/Optional Indicators ──────────────────────────────────────────
export const INPUT_REQUIRED_INDICATOR = 'ml-1 text-neurospark' as const;
export const INPUT_OPTIONAL_INDICATOR = 'ml-1 text-star-dust/40 text-xs' as const;

// ─── Wrapper ───────────────────────────────────────────────────────────────
export const INPUT_WRAPPER_CLASSES = 'flex flex-col gap-1.5' as const;
export const INPUT_FULL_WIDTH_CLASS = 'w-full' as const;

// ─── Icon Container ────────────────────────────────────────────────────────
export const INPUT_ICON_CONTAINER_CLASSES = 'absolute top-1/2 -translate-y-1/2 text-star-dust/40' as const;

// ─── Container ─────────────────────────────────────────────────────────────
export const INPUT_CONTAINER_CLASSES = 'relative' as const;