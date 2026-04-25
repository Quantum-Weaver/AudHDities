// src/lib/constants/components/ui/progress.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    PROGRESS VARIANTS                                      ║
// ║                    CVA variant definitions for Progress                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  PROGRESS_BASE_CLASSES,
  PROGRESS_FILL_BASE_CLASSES,
  PROGRESS_STRIPE_GRADIENT,
  PROGRESS_STRIPE_SIZE,
} from './progress.constants';

// ─── Type Exports ───────────────────────────────────────────────────────────
export const PROGRESS_VARIANTS = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  QUANTUM: 'quantum',
  COSMIC: 'cosmic',
} as const;

export const PROGRESS_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export const PROGRESS_LABEL_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export type ProgressVariant = (typeof PROGRESS_VARIANTS)[keyof typeof PROGRESS_VARIANTS];
export type ProgressSize = (typeof PROGRESS_SIZES)[keyof typeof PROGRESS_SIZES];
export type ProgressLabelPosition = (typeof PROGRESS_LABEL_POSITIONS)[keyof typeof PROGRESS_LABEL_POSITIONS];

// ─── Track Variants ─────────────────────────────────────────────────────────
export const progressTrackVariants = cva(
  PROGRESS_BASE_CLASSES.join(' '),
  {
    variants: {
      variant: {
        default: 'bg-white/20',
        success: 'bg-success/20',
        warning: 'bg-warning/20',
        error: 'bg-error/20',
        quantum: 'bg-quantum-purple/20',
        cosmic: 'bg-cosmic-blue/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ─── Fill Variants ──────────────────────────────────────────────────────────
export const progressFillVariants = cva(
  PROGRESS_FILL_BASE_CLASSES.join(' '),
  {
    variants: {
      variant: {
        default: 'bg-white/60',
        success: 'bg-success',
        warning: 'bg-warning',
        error: 'bg-error',
        quantum: 'bg-quantum-purple',
        cosmic: 'bg-cosmic-blue',
      },
      striped: {
        true: [PROGRESS_STRIPE_GRADIENT, PROGRESS_STRIPE_SIZE, 'animate-[stripe_1s_linear_infinite]'].join(' '),
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      striped: false,
    },
  }
);

// ─── SVG Stroke Variants ────────────────────────────────────────────────────
export const progressStrokeVariants = cva('transition-all duration-300 ease-out', {
  variants: {
    variant: {
      default: 'stroke-white/60',
      success: 'stroke-success',
      warning: 'stroke-warning',
      error: 'stroke-error',
      quantum: 'stroke-quantum-purple',
      cosmic: 'stroke-cosmic-blue',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ─── SVG Track Variants ─────────────────────────────────────────────────────
export const progressTrackStrokeVariants = cva('', {
  variants: {
    variant: {
      default: 'stroke-white/10',
      success: 'stroke-success/20',
      warning: 'stroke-warning/20',
      error: 'stroke-error/20',
      quantum: 'stroke-quantum-purple/20',
      cosmic: 'stroke-cosmic-blue/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});