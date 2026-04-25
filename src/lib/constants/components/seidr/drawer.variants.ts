// src/lib/constants/components/ui/drawer.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DRAWER VARIANTS                                        ║
// ║                    CVA variant definitions for Drawer                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  DRAWER_PANEL_BG,
  DRAWER_BORDER_COLOR,
  DRAWER_SHADOW,
  DRAWER_TRANSITION_DURATION,
  DRAWER_TRANSITION_EASING,
} from '../seidr/drawer.constants';

// ─── Side & Size Types ──────────────────────────────────────────────────────
export const DRAWER_SIDES = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export const DRAWER_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  FULL: 'full',
} as const;

export type DrawerSide = (typeof DRAWER_SIDES)[keyof typeof DRAWER_SIDES];
export type DrawerSize = (typeof DRAWER_SIZES)[keyof typeof DRAWER_SIZES];

// ─── Panel Variants ─────────────────────────────────────────────────────────
export const drawerPanelVariants = cva(
  [
    'fixed',
    DRAWER_PANEL_BG,
    DRAWER_BORDER_COLOR,
    DRAWER_SHADOW,
    'transition-transform',
    DRAWER_TRANSITION_DURATION,
    DRAWER_TRANSITION_EASING,
  ].join(' '),
  {
    variants: {
      side: {
        left: '',
        right: '',
        top: '',
        bottom: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
        full: '',
      },
    },
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  }
);

// ─── Footer Alignment ───────────────────────────────────────────────────────
export const drawerFooterAlignVariants = cva('flex gap-3 p-4 border-t border-white/10', {
  variants: {
    align: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    },
  },
  defaultVariants: {
    align: 'right',
  },
});

export type DrawerFooterAlign = NonNullable<
  Parameters<typeof drawerFooterAlignVariants>[0]
>['align'];