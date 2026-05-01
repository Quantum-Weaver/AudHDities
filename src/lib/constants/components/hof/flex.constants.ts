// srv/lib/constants/components/hof/flex.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FLEX CONSTANTS                                         ║
// ║                    Single source of truth — direction, wrap, align, gap   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic';

// ─── Direction Tokens ──────────────────────────────────────────────────────
export const FLEX_DIRECTION = {
  ROW: 'row',
  COLUMN: 'column',
  'ROW_REVERSE': 'row-reverse',
  'COLUMN_REVERSE': 'column-reverse',
} as const;

export const FLEX_DIRECTION_CLASSES: Record<keyof typeof FLEX_DIRECTION, string> = {
  ROW: 'flex-row',
  COLUMN: 'flex-col',
  ROW_REVERSE: 'flex-row-reverse',
  COLUMN_REVERSE: 'flex-col-reverse',
} as const;

// ─── Wrap Tokens ───────────────────────────────────────────────────────────
export const FLEX_WRAP = {
  WRAP: 'wrap',
  NOWRAP: 'nowrap',
  'WRAP_REVERSE': 'wrap-reverse',
} as const;

export const FLEX_WRAP_CLASSES: Record<keyof typeof FLEX_WRAP, string> = {
  WRAP: 'flex-wrap',
  NOWRAP: 'flex-nowrap',
  WRAP_REVERSE: 'flex-wrap-reverse',
} as const;

// ─── Justify Tokens ────────────────────────────────────────────────────────
export const FLEX_JUSTIFY = {
  START: 'start',
  END: 'end',
  CENTER: 'center',
  BETWEEN: 'between',
  AROUND: 'around',
  EVENLY: 'evenly',
} as const;

export const FLEX_JUSTIFY_CLASSES: Record<keyof typeof FLEX_JUSTIFY, string> = {
  START: 'justify-start',
  END: 'justify-end',
  CENTER: 'justify-center',
  BETWEEN: 'justify-between',
  AROUND: 'justify-around',
  EVENLY: 'justify-evenly',
} as const;

// ─── Align Tokens ──────────────────────────────────────────────────────────
export const FLEX_ALIGN = {
  START: 'start',
  END: 'end',
  CENTER: 'center',
  STRETCH: 'stretch',
  BASELINE: 'baseline',
} as const;

export const FLEX_ALIGN_CLASSES: Record<keyof typeof FLEX_ALIGN, string> = {
  START: 'items-start',
  END: 'items-end',
  CENTER: 'items-center',
  STRETCH: 'items-stretch',
  BASELINE: 'items-baseline',
} as const;

// ─── Gap Tokens (mapped to Tailwind spacing scale) ─────────────────────────
export const FLEX_GAP = {
  NONE: 'none',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  '3XL': '3xl',
  '4XL': '4xl',
} as const;

/**
 * Gap → Tailwind class mapping.
 * Values reference the COSMIC spacing scale:
 *   xs → gap-1 (4px), sm → gap-2 (8px), md → gap-4 (16px),
 *   lg → gap-6 (24px), xl → gap-8 (32px), 2xl → gap-12 (48px),
 *   3xl → gap-16 (64px), 4xl → gap-24 (96px)
 */
export const FLEX_GAP_CLASSES: Record<keyof typeof FLEX_GAP, string> = {
  NONE: 'gap-0',
  XS: 'gap-1',
  SM: 'gap-2',
  MD: 'gap-4',
  LG: 'gap-6',
  XL: 'gap-8',
  '2XL': 'gap-12',
  '3XL': 'gap-16',
  '4XL': 'gap-24',
} as const;

export const FLEX_ROW_GAP_CLASSES: Record<keyof typeof FLEX_GAP, string> = {
  NONE: 'gap-y-0',
  XS: 'gap-y-1',
  SM: 'gap-y-2',
  MD: 'gap-y-4',
  LG: 'gap-y-6',
  XL: 'gap-y-8',
  '2XL': 'gap-y-12',
  '3XL': 'gap-y-16',
  '4XL': 'gap-y-24',
} as const;

export const FLEX_COLUMN_GAP_CLASSES: Record<keyof typeof FLEX_GAP, string> = {
  NONE: 'gap-x-0',
  XS: 'gap-x-1',
  SM: 'gap-x-2',
  MD: 'gap-x-4',
  LG: 'gap-x-6',
  XL: 'gap-x-8',
  '2XL': 'gap-x-12',
  '3XL': 'gap-x-16',
  '4XL': 'gap-x-24',
} as const;

// ─── Align Self Tokens (for FlexItem) ──────────────────────────────────────
export const FLEX_ALIGN_SELF = {
  AUTO: 'auto',
  START: 'start',
  END: 'end',
  CENTER: 'center',
  STRETCH: 'stretch',
  BASELINE: 'baseline',
} as const;

export const FLEX_ALIGN_SELF_CLASSES: Record<keyof typeof FLEX_ALIGN_SELF, string> = {
  AUTO: 'self-auto',
  START: 'self-start',
  END: 'self-end',
  CENTER: 'self-center',
  STRETCH: 'self-stretch',
  BASELINE: 'self-baseline',
} as const;

// ─── Responsive Breakpoints ────────────────────────────────────────────────
/** Tailwind breakpoint prefixes for responsive gap/direction */
export const FLEX_RESPONSIVE_PREFIXES = {
  MOBILE: '',
  TABLET: 'md:',
  DESKTOP: 'lg:',
  WIDE: 'xl:',
} as const;