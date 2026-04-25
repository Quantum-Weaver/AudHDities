// src/lib/constants/components/ui/stack.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    STACK CONSTANTS                                        ║
// ║                    Spacing maps derived from COSMIC scale                 ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic';

// ─── Spacing Tokens ─────────────────────────────────────────────────────────
export const STACK_SPACING = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  NONE: 'none',
} as const;

export type StackSpacing = (typeof STACK_SPACING)[keyof typeof STACK_SPACING];

// ─── Alignment Tokens ───────────────────────────────────────────────────────
export const STACK_ALIGN = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  STRETCH: 'stretch',
} as const;

export type StackAlign = (typeof STACK_ALIGN)[keyof typeof STACK_ALIGN];

// ─── Justification Tokens ───────────────────────────────────────────────────
export const STACK_JUSTIFY = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  BETWEEN: 'between',
  AROUND: 'around',
} as const;

export type StackJustify = (typeof STACK_JUSTIFY)[keyof typeof STACK_JUSTIFY];

// ─── Direction Tokens ───────────────────────────────────────────────────────
export const STACK_DIRECTION = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
} as const;

export type StackDirection =
  (typeof STACK_DIRECTION)[keyof typeof STACK_DIRECTION];

// ─── Gap Map (uses Tailwind spacing scale from COSMIC) ──────────────────────
export const STACK_GAP_MAP: Record<StackSpacing, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
  none: 'gap-0',
};

// ─── Align Map ──────────────────────────────────────────────────────────────
export const STACK_ALIGN_MAP: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

// ─── Justify Map (Vertical) ─────────────────────────────────────────────────
export const STACK_JUSTIFY_VERTICAL_MAP: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

// ─── Justify Map (Horizontal) ───────────────────────────────────────────────
export const STACK_JUSTIFY_HORIZONTAL_MAP: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

// ─── Responsive Breakpoint Prefixes ─────────────────────────────────────────
export const STACK_RESPONSIVE_PREFIX = {
  MOBILE: '',
  TABLET: 'md:',
  DESKTOP: 'lg:',
} as const;

// ─── Divider Wrapper Classes ────────────────────────────────────────────────
export const STACK_DIVIDER_WRAPPER_VERTICAL = 'w-full';
export const STACK_DIVIDER_WRAPPER_HORIZONTAL = 'h-full';