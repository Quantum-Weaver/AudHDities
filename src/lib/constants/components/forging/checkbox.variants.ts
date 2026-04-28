// src/lib/constants/components/forging/checkbox.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CHECKBOX VARIANTS                                      ║
// ║                    CVA variant definitions                                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  CHECKBOX_SIZE,
  CHECKBOX_SPACING,
} from './checkbox.constants';

export const checkboxVariants = cva(
  [
    'appearance-none',
    'transition-all duration-fast',
    'checked:bg-quantum-purple checked:border-quantum-purple',
    'focus-visible:ring-2 focus-visible:ring-neurospark/50 focus-visible:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'cursor-pointer',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'rounded-sm',
          'border border-white/20',
          'bg-transparent',
          'checked:bg-quantum-purple',
        ].join(' '),
        rounded: [
          'rounded-full',
          'border border-white/20',
          'bg-transparent',
          'checked:bg-quantum-purple',
        ].join(' '),
        card: [
          'w-full p-4 rounded-lg',
          'border-2 border-white/10',
          'bg-transparent',
          'checked:border-quantum-purple checked:bg-quantum-purple/10',
        ].join(' '),
      },
      size: {
        sm: CHECKBOX_SIZE.SM,
        md: CHECKBOX_SIZE.MD,
        lg: CHECKBOX_SIZE.LG,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type CheckboxVariant = NonNullable<
  Parameters<typeof checkboxVariants>[0]
>['variant'];

export type CheckboxSizeVariant = NonNullable<
  Parameters<typeof checkboxVariants>[0]
>['size'];