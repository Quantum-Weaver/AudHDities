// src/lib/constants/components/forging/radio.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    RADIO VARIANTS                                         ║
// ║                    CVA definitions — all colors from COSMIC               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  RADIO_SIZE,
  RADIO_RADIUS,
  RADIO_PADDING,
  RADIO_DISABLED,
  RADIO_TRANSITION,
  RADIO_FOCUS_RING,
  RADIO_INDICATOR_SIZE,
} from './radio.constants';

// ─── Control Variants (the radio circle itself) ────────────────────────────
export const radioControlVariants = cva(
  [
    'appearance-none',
    RADIO_RADIUS.CONTROL,
    'border',
    RADIO_TRANSITION,
    'cursor-pointer',
    RADIO_FOCUS_RING.WIDTH,
    'focus:outline-none',
    'focus-visible:ring-quantum-purple/50',
    RADIO_DISABLED,
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-transparent',
          'border-star-dust/20',
          'checked:bg-quantum-purple',
          'checked:border-quantum-purple',
        ].join(' '),
        card: [
          'w-full',
          RADIO_PADDING.CARD,
          RADIO_RADIUS.CARD,
          'border-2',
          'border-white/10',
          'bg-transparent',
          'checked:border-quantum-purple',
          'checked:bg-quantum-purple/10',
        ].join(' '),
        button: [
          RADIO_PADDING.BUTTON_X,
          RADIO_PADDING.BUTTON_Y,
          RADIO_RADIUS.BUTTON,
          'border',
          'border-white/10',
          'bg-transparent',
          'checked:bg-quantum-purple',
          'checked:text-star-dust',
        ].join(' '),
      },
      size: {
        sm: RADIO_SIZE.SM,
        md: RADIO_SIZE.MD,
        lg: RADIO_SIZE.LG,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ─── Indicator Variants (the inner dot) ─────────────────────────────────────
export const radioIndicatorVariants = cva(
  [
    'absolute',
    'top-1/2',
    'left-1/2',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'rounded-full',
    'bg-white',
    'transition-all',
    'pointer-events-none',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'size-1.5',
        md: 'size-2',
        lg: 'size-2.5',
      },
      checked: {
        true: 'opacity-100 scale-100',
        false: 'opacity-0 scale-0',
      },
    },
    defaultVariants: {
      size: 'md',
      checked: false,
    },
  }
);

// ─── Label Variants ─────────────────────────────────────────────────────────
export const radioLabelVariants = cva(
  'cursor-pointer select-none text-star-dust/80',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  }
);

// ─── Group Variants ─────────────────────────────────────────────────────────
export const radioGroupVariants = cva(
  'flex flex-col',
  {
    variants: {
      direction: {
        vertical: 'gap-2',
        horizontal: 'flex-row flex-wrap gap-4',
      },
    },
    defaultVariants: {
      direction: 'vertical',
    },
  }
);

// ─── Type Exports ──────────────────────────────────────────────────────────
export type RadioVariant = NonNullable<
  Parameters<typeof radioControlVariants>[0]
>['variant'];
export type RadioSize = NonNullable<
  Parameters<typeof radioControlVariants>[0]
>['size'];
export type RadioGroupDirection = NonNullable<
  Parameters<typeof radioGroupVariants>[0]
>['direction'];