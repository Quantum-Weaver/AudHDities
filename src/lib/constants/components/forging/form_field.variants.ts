// srv/lib/constants/components/forging/form_field.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM FIELD VARIANTS                                    ║
// ║                    CVA variant definitions for FormField                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  FORM_FIELD_HELPER_MARGIN_TOP,
  FORM_FIELD_HELPER_COLOR,
  FORM_FIELD_ERROR_MARGIN_TOP,
  FORM_FIELD_ERROR_COLOR,
  FORM_FIELD_DISABLED_OPACITY,
} from './form_field.constants';

// ─── Type Exports ───────────────────────────────────────────────────────────
export const FORM_FIELD_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export const FORM_FIELD_LAYOUTS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
} as const;

export type FormFieldSize = (typeof FORM_FIELD_SIZES)[keyof typeof FORM_FIELD_SIZES];
export type FormFieldLayout = (typeof FORM_FIELD_LAYOUTS)[keyof typeof FORM_FIELD_LAYOUTS];

// ─── Helper Text Variants ───────────────────────────────────────────────────
export const formFieldHelperVariants = cva('', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
    disabled: {
      true: FORM_FIELD_DISABLED_OPACITY,
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
});

// ─── Error Text Variants ────────────────────────────────────────────────────
export const formFieldErrorVariants = cva('', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});