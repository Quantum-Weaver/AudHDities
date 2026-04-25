// src/lib/constants/components/hof/spacer.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SPACER CONSTANTS                                       ║
// ║                    Sizing, axis, direction tokens                         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE, BREAKPOINTS } from '@/lib/constants/cosmic';

// ─── Size Keys ─────────────────────────────────────────────────────────────
/** Semantic spacer sizes mapped to COSMIC spacing scale keys */
export const SPACER_SIZES = {
  XS: '1',    // 4px
  SM: '2',    // 8px
  MD: '4',    // 16px
  LG: '6',    // 24px
  XL: '8',    // 32px
  '2XL': '12', // 48px
  '3XL': '16', // 64px
  '4XL': '24', // 96px
} as const;

export type SpacerSize = keyof typeof SPACER_SIZES;

/** Pixel values for each spacer size (derived from SPACING_SCALE) */
export const SPACER_PX_MAP: Record<SpacerSize, number> = {
  XS: parseInt(SPACING_SCALE[SPACER_SIZES.XS]),
  SM: parseInt(SPACING_SCALE[SPACER_SIZES.SM]),
  MD: parseInt(SPACING_SCALE[SPACER_SIZES.MD]),
  LG: parseInt(SPACING_SCALE[SPACER_SIZES.LG]),
  XL: parseInt(SPACING_SCALE[SPACER_SIZES.XL]),
  '2XL': parseInt(SPACING_SCALE[SPACER_SIZES['2XL']]),
  '3XL': parseInt(SPACING_SCALE[SPACER_SIZES['3XL']]),
  '4XL': parseInt(SPACING_SCALE[SPACER_SIZES['4XL']]),
};

// ─── Axis Tokens ───────────────────────────────────────────────────────────
export const SPACER_AXIS = {
  BOTH: 'both',
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

export type SpacerAxis = (typeof SPACER_AXIS)[keyof typeof SPACER_AXIS];

// ─── Direction Tokens ──────────────────────────────────────────────────────
export const SPACER_DIRECTION = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  ALL: 'all',
} as const;

export type SpacerDirection = (typeof SPACER_DIRECTION)[keyof typeof SPACER_DIRECTION];

// ─── Responsive Breakpoint Keys ────────────────────────────────────────────
/** Breakpoint labels used in responsive prop (matches BREAKPOINTS) */
export const SPACER_RESPONSIVE_BREAKPOINTS = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  WIDE: 'wide',
} as const;

export type SpacerResponsiveBreakpoint =
  (typeof SPACER_RESPONSIVE_BREAKPOINTS)[keyof typeof SPACER_RESPONSIVE_BREAKPOINTS];

/** Maps responsive labels to Tailwind breakpoint prefixes */
export const RESPONSIVE_PREFIX_MAP: Record<SpacerResponsiveBreakpoint, string> = {
  mobile: '',                          // Base — no prefix
  tablet: `${BREAKPOINTS.md}:`,        // md:
  desktop: `${BREAKPOINTS.lg}:`,       // lg:
  wide: `${BREAKPOINTS.xl}:`,          // xl:
};

// ─── Base Tailwind Classes ─────────────────────────────────────────────────
/** Full-width/height classes used in directional spacing */
export const SPACER_FULL_CLASSES = {
  WIDTH: 'w-full',
  HEIGHT: 'h-full',
} as const;

/** Flex utility classes */
export const SPACER_FLEX_CLASSES = {
  GROW: 'flex-grow',
  SHRINK: 'flex-shrink',
  ROW: 'flex-row',
  COL: 'flex-col',
  FLEX: 'flex',
} as const;