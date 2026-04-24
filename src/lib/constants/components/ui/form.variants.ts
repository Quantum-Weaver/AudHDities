// src/lib/constants/components/ui/form.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM VARIANTS                                          ║
// ║                    CVA variant definitions only                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import { FORM_SPACING_CLASSES } from './form.constants';

// ─── Re-export for convenience ─────────────────────────────────────────────
export { FORM_SPACING_KEYS, FORM_SPACING_CLASSES } from './form.constants';
export type { FormSpacing } from './form.constants';

// ─── Form Container Variants ───────────────────────────────────────────────
export const formVariants = cva(
  'flex flex-col',
  {
    variants: {
      spacing: FORM_SPACING_CLASSES,
    },
    defaultVariants: {
      spacing: 'md',
    },
  }
);

// ─── Form Section Variants ─────────────────────────────────────────────────
export const formSectionVariants = cva(
  'flex flex-col',
  {
    variants: {
      spacing: FORM_SPACING_CLASSES,
    },
    defaultVariants: {
      spacing: 'md',
    },
  }
);

// ─── Form Field Group Variants ─────────────────────────────────────────────
export const formFieldGroupVariants = cva(
  'flex flex-col sm:flex-row',
  {
    variants: {
      spacing: FORM_SPACING_CLASSES,
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
    },
    defaultVariants: {
      spacing: 'md',
      align: 'start',
    },
  }
);

// ─── Form Actions Variants ─────────────────────────────────────────────────
export const formActionsVariants = cva(
  'flex',
  {
    variants: {
      spacing: FORM_SPACING_CLASSES,
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
      },
      direction: {
        row: 'flex-row',
        column: 'flex-col',
        'row-reverse': 'flex-row-reverse',
      },
    },
    defaultVariants: {
      spacing: 'md',
      justify: 'end',
      direction: 'row',
    },
  }
);

export type FormVariantProps = Parameters<typeof formVariants>[0];
export type FormSectionVariantProps = Parameters<typeof formSectionVariants>[0];
export type FormFieldGroupVariantProps = Parameters<typeof formFieldGroupVariants>[0];
export type FormActionsVariantProps = Parameters<typeof formActionsVariants>[0];