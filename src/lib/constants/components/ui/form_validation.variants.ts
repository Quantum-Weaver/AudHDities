// srv/lib/constants/components/ui/form_validation.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM VALIDATION VARIANTS                               ║
// ║                    CVA variant definitions for validation states          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  FORM_VALIDATION_SUMMARY_PADDING,
  FORM_VALIDATION_SUMMARY_RADIUS,
  FORM_VALIDATION_SUCCESS_PADDING,
  FORM_VALIDATION_SUCCESS_RADIUS,
} from './form_validation.constants';

// ─── Type Exports ───────────────────────────────────────────────────────────
export const VALIDATION_STATUSES = {
  IDLE: 'idle',
  VALIDATING: 'validating',
  VALID: 'valid',
  INVALID: 'invalid',
} as const;

export type ValidationStatus =
  (typeof VALIDATION_STATUSES)[keyof typeof VALIDATION_STATUSES];

// ─── Summary Container Variants ─────────────────────────────────────────────
export const formValidationSummaryVariants = cva(
  [
    FORM_VALIDATION_SUMMARY_PADDING,
    FORM_VALIDATION_SUMMARY_RADIUS,
    'border',
  ].join(' '),
  {
    variants: {
      variant: {
        error: 'bg-error/10 border-error/30',
        warning: 'bg-warning/10 border-warning/30',
        info: 'bg-info/10 border-info/30',
      },
    },
    defaultVariants: {
      variant: 'error',
    },
  }
);

// ─── Summary Text Variants ──────────────────────────────────────────────────
export const formValidationTextVariants = cva('', {
  variants: {
    variant: {
      error: 'text-error',
      warning: 'text-warning',
      info: 'text-info',
    },
  },
  defaultVariants: {
    variant: 'error',
  },
});

// ─── Success Container Variants ─────────────────────────────────────────────
export const formValidationSuccessVariants = cva(
  [
    FORM_VALIDATION_SUCCESS_PADDING,
    FORM_VALIDATION_SUCCESS_RADIUS,
    'border',
  ].join(' '),
  {
    variants: {
      variant: {
        success: 'bg-success/10 border-success/30',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  }
);

// ─── Success Text Variants ──────────────────────────────────────────────────
export const formValidationSuccessTextVariants = cva('', {
  variants: {
    variant: {
      success: 'text-success',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

// ─── Field Status Icon Variants ─────────────────────────────────────────────
export const formValidationStatusIconVariants = cva('', {
  variants: {
    status: {
      idle: 'text-white/20',
      validating: 'text-warning animate-pulse',
      valid: 'text-success',
      invalid: 'text-error',
    },
  },
  defaultVariants: {
    status: 'idle',
  },
});