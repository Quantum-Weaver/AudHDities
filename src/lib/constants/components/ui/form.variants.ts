// src/lib/constants/components/ui/form.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM VARIANTS                                          ║
// ║                    CVA variant definitions for Form                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  FORM_LAYOUT_VERTICAL,
  FORM_LAYOUT_HORIZONTAL,
  FORM_ACTIONS_MARGIN_TOP,
  FORM_ACTIONS_PADDING_TOP,
  FORM_ACTIONS_BORDER_TOP,
  FORM_ACTIONS_BORDER_COLOR,
} from './form.constants';

// ─── Type Exports ───────────────────────────────────────────────────────────
export const FORM_LAYOUTS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
} as const;

export const FORM_SPACINGS = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export const FORM_ACTIONS_ALIGNMENTS = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

export type FormLayout = (typeof FORM_LAYOUTS)[keyof typeof FORM_LAYOUTS];
export type FormSpacing = (typeof FORM_SPACINGS)[keyof typeof FORM_SPACINGS];
export type FormActionsAlign =
  (typeof FORM_ACTIONS_ALIGNMENTS)[keyof typeof FORM_ACTIONS_ALIGNMENTS];

// ─── Form Container Variants ────────────────────────────────────────────────
export const formContainerVariants = cva('flex', {
  variants: {
    layout: {
      vertical: FORM_LAYOUT_VERTICAL,
      horizontal: FORM_LAYOUT_HORIZONTAL,
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
});

// ─── Form Actions Container Variants ───────────────────────────────────────
export const formActionsContainerVariants = cva(
  'flex',
  {
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
  }
);

// ─── Form Actions Divider ──────────────────────────────────────────────────
export const formActionsDividerClasses = [
  FORM_ACTIONS_MARGIN_TOP,
  FORM_ACTIONS_PADDING_TOP,
  FORM_ACTIONS_BORDER_TOP,
  FORM_ACTIONS_BORDER_COLOR,
].join(' ');