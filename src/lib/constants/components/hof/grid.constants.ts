// src/lib/constants/components/hof/grid.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    GRID CONSTANTS                                         ║
// ║                    Base spacing, alignment, flow tokens                   ║
// ║                    All values derived from COSMIC                         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic';

// ─── Spacing Scale Keys ────────────────────────────────────────────────────
export const GRID_SPACING_VALUES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  NONE: 'none',
} as const;

export type GridSpacing = (typeof GRID_SPACING_VALUES)[keyof typeof GRID_SPACING_VALUES];

// ─── Gap Map — maps GridSpacing to Tailwind gap classes ─────────────────────
/** Uses COSMIC spacing scale: xs=4px, sm=8px, md=16px, lg=24px, xl=32px, 2xl=48px */
export const GRID_GAP_MAP: Record<GridSpacing, string> = {
  xs: 'gap-1',      // 4px
  sm: 'gap-2',      // 8px
  md: 'gap-4',      // 16px
  lg: 'gap-6',      // 24px
  xl: 'gap-8',      // 32px
  '2xl': 'gap-12',  // 48px
  none: 'gap-0',
};

export const GRID_ROW_GAP_MAP: Record<GridSpacing, string> = {
  xs: 'gap-y-1',
  sm: 'gap-y-2',
  md: 'gap-y-4',
  lg: 'gap-y-6',
  xl: 'gap-y-8',
  '2xl': 'gap-y-12',
  none: 'gap-y-0',
};

export const GRID_COL_GAP_MAP: Record<GridSpacing, string> = {
  xs: 'gap-x-1',
  sm: 'gap-x-2',
  md: 'gap-x-4',
  lg: 'gap-x-6',
  xl: 'gap-x-8',
  '2xl': 'gap-x-12',
  none: 'gap-x-0',
};

// ─── Alignment ──────────────────────────────────────────────────────────────
export const GRID_ALIGN_VALUES = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  STRETCH: 'stretch',
} as const;

export type GridAlign = (typeof GRID_ALIGN_VALUES)[keyof typeof GRID_ALIGN_VALUES];

export const GRID_ALIGN_MAP: Record<GridAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

// ─── Justify ────────────────────────────────────────────────────────────────
export const GRID_JUSTIFY_VALUES = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  BETWEEN: 'between',
  AROUND: 'around',
  EVENLY: 'evenly',
} as const;

export type GridJustify = (typeof GRID_JUSTIFY_VALUES)[keyof typeof GRID_JUSTIFY_VALUES];

export const GRID_JUSTIFY_MAP: Record<GridJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

// ─── Flow ───────────────────────────────────────────────────────────────────
export const GRID_FLOW_VALUES = {
  ROW: 'row',
  COL: 'col',
  ROW_DENSE: 'row-dense',
  COL_DENSE: 'col-dense',
} as const;

export type GridFlow = (typeof GRID_FLOW_VALUES)[keyof typeof GRID_FLOW_VALUES];

export const GRID_FLOW_MAP: Record<GridFlow, string> = {
  row: 'grid-flow-row',
  col: 'grid-flow-col',
  'row-dense': 'grid-flow-row-dense',
  'col-dense': 'grid-flow-col-dense',
};

// ─── Responsive Breakpoint Prefixes ─────────────────────────────────────────
export const RESPONSIVE_PREFIX = {
  MOBILE: '',
  TABLET: 'md',
  DESKTOP: 'lg',
  WIDE: 'xl',
} as const;

export type ResponsivePrefix = (typeof RESPONSIVE_PREFIX)[keyof typeof RESPONSIVE_PREFIX];

// ─── Grid Item Span ─────────────────────────────────────────────────────────
export const GRID_SPAN_FULL = 'full' as const;
export const GRID_SPAN_AUTO = 'auto' as const;

/** Maximum column span */
export const GRID_MAX_SPAN = 12;

// ─── Default Column Counts ──────────────────────────────────────────────────
export const GRID_DEFAULT_COLS = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
  WIDE: 4,
} as const;