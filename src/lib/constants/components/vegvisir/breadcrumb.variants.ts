// src/lib/constants/components/vegvisir/breadcrumb.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    BREADCRUMB VARIANTS                                    ║
// ║                    CVA variant definitions for Breadcrumb                 ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  BREADCRUMB_LINK_COLOR,
  BREADCRUMB_LINK_HOVER_COLOR,
  BREADCRUMB_LINK_FOCUS_RING,
  BREADCRUMB_CURRENT_COLOR,
  BREADCRUMB_CURRENT_WEIGHT,
  BREADCRUMB_DISABLED_OPACITY,
  BREADCRUMB_DISABLED_CURSOR,
  BREADCRUMB_INACTIVE_COLOR,
  BREADCRUMB_ITEM_GAP,
} from './breadcrumb.constants';

// ─── Size & Separator Types ─────────────────────────────────────────────────
export const BREADCRUMB_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export const BREADCRUMB_SEPARATORS = {
  CHEVRON: 'chevron',
  SLASH: 'slash',
  DOT: 'dot',
  ARROW: 'arrow',
} as const;

export type BreadcrumbSize = (typeof BREADCRUMB_SIZES)[keyof typeof BREADCRUMB_SIZES];
export type BreadcrumbSeparatorType = (typeof BREADCRUMB_SEPARATORS)[keyof typeof BREADCRUMB_SEPARATORS];

// ─── Size Variants ──────────────────────────────────────────────────────────
export const breadcrumbSizeVariants = cva('', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ─── Link Variants ──────────────────────────────────────────────────────────
export const breadcrumbLinkVariants = cva(
  [
    'flex items-center',
    BREADCRUMB_ITEM_GAP,
    'transition-colors',
    BREADCRUMB_LINK_COLOR,
    BREADCRUMB_LINK_HOVER_COLOR,
    BREADCRUMB_LINK_FOCUS_RING,
  ].join(' '),
  {
    variants: {
      state: {
        default: '',
        current: [BREADCRUMB_CURRENT_COLOR, BREADCRUMB_CURRENT_WEIGHT].join(' '),
        disabled: [BREADCRUMB_DISABLED_OPACITY, BREADCRUMB_DISABLED_CURSOR].join(' '),
        inactive: BREADCRUMB_INACTIVE_COLOR,
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

// ─── Dropdown Item Variants ─────────────────────────────────────────────────
export const breadcrumbDropdownItemVariants = cva(
  ['block', 'px-3', 'py-1.5', 'text-sm', 'transition-colors'].join(' '),
  {
    variants: {
      state: {
        default: 'text-white/80 hover:bg-white/5',
        current: 'text-cyan-400',
        inactive: 'text-white/40',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

// ─── Separator Variants ─────────────────────────────────────────────────────
export const breadcrumbSeparatorVariants = cva(
  ['flex items-center', 'text-white/40', 'mx-1'].join(' '),
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-3 w-3',
        lg: 'h-4 w-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);