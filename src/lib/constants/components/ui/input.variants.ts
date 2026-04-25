// src/lib/constants/components/ui/input.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    INPUT VARIANTS                                         ║
// ║                    CVA variant definitions for Input                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  INPUT_BASE_CLASSES,
  INPUT_ICON_PADDING,
  INPUT_HEIGHT,
  INPUT_PADDING,
} from './input.constants';

// ─── Selection types ───────────────────────────────────────────────────────
type VariantProp = NonNullable<Parameters<typeof inputVariants>[0]>['variant'];
type SizeProp = NonNullable<Parameters<typeof inputVariants>[0]>['size'];

// ─── Main Variants ─────────────────────────────────────────────────────────
export const inputVariants = cva(INPUT_BASE_CLASSES.join(' '), {
  variants: {
    variant: {
      default:
        'border-white/10 focus:border-neurospark focus:ring-1 focus:ring-neurospark/50',
      error:
        'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50',
      success:
        'border-green-500/50 focus:border-green-500 focus:ring-1 focus:ring-green-500/50',
      warning:
        'border-yellow-500/50 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50',
      filled:
        'bg-white/5 border-white/10 focus:border-neurospark focus:ring-1 focus:ring-neurospark/50',
      underlined:
        'border-t-0 border-r-0 border-l-0 rounded-none px-0 focus:ring-0',
    },
    size: {
      sm: [
        `h-[${INPUT_HEIGHT.sm}]`,
        `px-[${INPUT_PADDING.sm.x}]`,
        'text-xs',
      ].join(' '),
      md: [
        `h-[${INPUT_HEIGHT.md}]`,
        `px-[${INPUT_PADDING.md.x}]`,
        'text-sm',
      ].join(' '),
      lg: [
        `h-[${INPUT_HEIGHT.lg}]`,
        `px-[${INPUT_PADDING.lg.x}]`,
        'text-base',
      ].join(' '),
    },
    withIcon: {
      left: INPUT_ICON_PADDING.LEFT,
      right: INPUT_ICON_PADDING.RIGHT,
      both: INPUT_ICON_PADDING.BOTH,
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// ─── Type Exports ──────────────────────────────────────────────────────────
export type InputVariant = VariantProp;
export type InputSize = SizeProp;