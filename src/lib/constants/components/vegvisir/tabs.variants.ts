// src/lib/constants/components/vegvisir/tabs.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TABS VARIANTS                                          ║
// ║                    CVA variant definitions                                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  TABS_TRIGGER_BASE,
  TABS_ORIENTATION,
  TABS_SIZE,
  TABS_TRIGGER_VARIANT,
  TABS_LIST_VARIANT,
} from './tabs.constants';
import type { TabsVariant, TabsSize, TabsOrientation } from './tabs.constants';

// ─── TabsList Variants ─────────────────────────────────────────────────────
export const tabsListVariants = cva(
  'flex',
  {
    variants: {
      variant: {
        underline: TABS_LIST_VARIANT.underline,
        pill: TABS_LIST_VARIANT.pill,
        bordered: TABS_LIST_VARIANT.bordered,
        minimal: TABS_LIST_VARIANT.minimal,
      },
      orientation: {
        horizontal: TABS_ORIENTATION.horizontal.list,
        vertical: TABS_ORIENTATION.vertical.list,
      },
      size: {
        sm: TABS_SIZE.sm.dimension,
        md: TABS_SIZE.md.dimension,
        lg: TABS_SIZE.lg.dimension,
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'underline',
      orientation: 'horizontal',
      size: 'md',
      fullWidth: false,
    },
  }
);

// ─── TabsTrigger Variants ──────────────────────────────────────────────────
export const tabsTriggerVariants = cva(
  [...TABS_TRIGGER_BASE].join(' '),
  {
    variants: {
      variant: {
        underline: '',
        pill: '',
        bordered: '',
        minimal: '',
      },
      size: {
        sm: TABS_SIZE.sm.fontSize,
        md: TABS_SIZE.md.fontSize,
        lg: TABS_SIZE.lg.fontSize,
      },
      orientation: {
        horizontal: TABS_ORIENTATION.horizontal.triggerPadding,
        vertical: TABS_ORIENTATION.vertical.triggerPadding,
      },
      state: {
        active: '',
        inactive: '',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'underline',
      size: 'md',
      orientation: 'horizontal',
      state: 'inactive',
    },
  }
);

// ─── TabsPanel Variants ────────────────────────────────────────────────────
export const tabsPanelVariants = cva(
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
  {
    variants: {
      orientation: {
        horizontal: '',
        vertical: 'flex-1 pl-6',
      },
      hidden: {
        true: 'hidden',
        false: '',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      hidden: false,
    },
  }
);

export type { TabsVariant, TabsSize, TabsOrientation };