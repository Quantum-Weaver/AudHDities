// src/lib/constants/components/yggdrasil/spinner.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SPINNER VARIANTS                                       ║
// ║                    CVA variant definitions — colors + sizes               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import type { SpinnerType } from './spinner.constants';

// ─── Variant color keys (used by CVA) ──────────────────────────────────────
export const SPINNER_VARIANTS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning',
  PURPLE: 'purple',
  WHITE: 'white',
} as const;

export type SpinnerVariant =
  (typeof SPINNER_VARIANTS)[keyof typeof SPINNER_VARIANTS];

// ─── Circle variant (border spinner) ───────────────────────────────────────
export const spinnerCircleVariants = cva('rounded-full', {
  variants: {
    variant: {
      default: 'border-neurospark border-t-transparent',
      primary: 'border-quantum-purple border-t-transparent',
      success: 'border-sanctuary-green border-t-transparent',
      warning: 'border-hearth-gold border-t-transparent',
      purple: 'border-quantum-purple border-t-transparent',
      white: 'border-white border-t-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ─── Dot variant (bouncing dots) ───────────────────────────────────────────
export const spinnerDotVariants = cva('rounded-full', {
  variants: {
    variant: {
      default: 'bg-neurospark',
      primary: 'bg-quantum-purple',
      success: 'bg-sanctuary-green',
      warning: 'bg-hearth-gold',
      purple: 'bg-quantum-purple',
      white: 'bg-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ─── Pulse variant (pulsing circle) ────────────────────────────────────────
export const spinnerPulseVariants = cva('rounded-full', {
  variants: {
    variant: {
      default: 'bg-neurospark',
      primary: 'bg-quantum-purple',
      success: 'bg-sanctuary-green',
      warning: 'bg-hearth-gold',
      purple: 'bg-quantum-purple',
      white: 'bg-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ─── Wave variant (dancing bars) ───────────────────────────────────────────
export const spinnerWaveVariants = cva('rounded-full', {
  variants: {
    variant: {
      default: 'bg-neurospark',
      primary: 'bg-quantum-purple',
      success: 'bg-sanctuary-green',
      warning: 'bg-hearth-gold',
      purple: 'bg-quantum-purple',
      white: 'bg-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ─── Composed: get variant class for a given type ──────────────────────────
export function getSpinnerVariantClass(
  type: SpinnerType,
  variant: SpinnerVariant
): string {
  switch (type) {
    case 'circle':
      return spinnerCircleVariants({ variant });
    case 'dots':
      return spinnerDotVariants({ variant });
    case 'pulse':
      return spinnerPulseVariants({ variant });
    case 'wave':
      return spinnerWaveVariants({ variant });
    default:
      return spinnerCircleVariants({ variant });
  }
}