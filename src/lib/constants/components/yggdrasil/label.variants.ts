// src/lib/constants/components/yggdrasil/label.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    LABEL VARIANTS                                         ║
// ║                    CVA variant definitions for Label                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  LABEL_BASE_CLASSES,
  LABEL_INDICATOR_SPACING,
  LABEL_FLOATING_LEFT,
} from './label.constants';

export const labelVariants = cva(LABEL_BASE_CLASSES.join(' '), {
  variants: {
    variant: {
      default: 'text-star-dust/80',
      required: [
        'text-star-dust/80',
        "after:content-['*']",
        LABEL_INDICATOR_SPACING.REQUIRED,
        'after:text-fire-base',
      ],
      optional: [
        'text-star-dust/80',
        "after:content-['(optional)']",
        LABEL_INDICATOR_SPACING.OPTIONAL,
        'after:text-star-dust/40',
        'after:text-xs',
        'after:font-normal',
      ],
      error: 'text-fire-base',
      floating: [
        'absolute',
        LABEL_FLOATING_LEFT,
        'transition-all',
        'pointer-events-none',
      ],
    },
    size: {
      sm: 'text-xs mb-1',
      md: 'text-sm mb-1.5',
      lg: 'text-base mb-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type LabelVariant = NonNullable<
  Parameters<typeof labelVariants>[0]
>['variant'];
export type LabelSize = NonNullable<
  Parameters<typeof labelVariants>[0]
>['size'];