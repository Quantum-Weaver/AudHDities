// src/lib/constants/components/ui/slider.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SLIDER VARIANTS                                        ║
// ║                    CVA definitions — imports from constants only          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  SLIDER_RANGE_COLOR_CLASSES,
  SLIDER_TRACK_SIZE_CLASSES,
  SLIDER_THUMB_SIZE_CLASSES,
  SLIDER_THUMB_BASE_CLASSES,
  SLIDER_FOCUS_COLOR_CLASSES,
  SLIDER_TRACK_BG_CLASS,
  DEFAULT_SLIDER_VARIANT,
  DEFAULT_SLIDER_SIZE,
} from './slider.constants';

// ─── Track Variants ────────────────────────────────────────────────────────
export const sliderTrackVariants = cva(
  `relative w-full grow rounded-full ${SLIDER_TRACK_BG_CLASS}`,
  {
    variants: {
      variant: {
        default: '',
        quantum: '',
        cosmic: '',
        fire: '',
        sanctuary: '',
      },
      size: {
        sm: SLIDER_TRACK_SIZE_CLASSES.sm,
        md: SLIDER_TRACK_SIZE_CLASSES.md,
        lg: SLIDER_TRACK_SIZE_CLASSES.lg,
      },
    },
    defaultVariants: {
      variant: DEFAULT_SLIDER_VARIANT,
      size: DEFAULT_SLIDER_SIZE,
    },
  }
);

// ─── Range (Fill) Variants ─────────────────────────────────────────────────
export const sliderRangeVariants = cva('absolute h-full rounded-full', {
  variants: {
    variant: {
      default: SLIDER_RANGE_COLOR_CLASSES.default,
      quantum: SLIDER_RANGE_COLOR_CLASSES.quantum,
      cosmic: SLIDER_RANGE_COLOR_CLASSES.cosmic,
      fire: SLIDER_RANGE_COLOR_CLASSES.fire,
      sanctuary: SLIDER_RANGE_COLOR_CLASSES.sanctuary,
    },
  },
  defaultVariants: {
    variant: DEFAULT_SLIDER_VARIANT,
  },
});

// ─── Thumb Variants ────────────────────────────────────────────────────────
export const sliderThumbVariants = cva(
  SLIDER_THUMB_BASE_CLASSES.join(' '),
  {
    variants: {
      variant: {
        default: SLIDER_FOCUS_COLOR_CLASSES.default,
        quantum: SLIDER_FOCUS_COLOR_CLASSES.quantum,
        cosmic: SLIDER_FOCUS_COLOR_CLASSES.cosmic,
        fire: SLIDER_FOCUS_COLOR_CLASSES.fire,
        sanctuary: SLIDER_FOCUS_COLOR_CLASSES.sanctuary,
      },
      size: {
        sm: SLIDER_THUMB_SIZE_CLASSES.sm,
        md: SLIDER_THUMB_SIZE_CLASSES.md,
        lg: SLIDER_THUMB_SIZE_CLASSES.lg,
      },
    },
    defaultVariants: {
      variant: DEFAULT_SLIDER_VARIANT,
      size: DEFAULT_SLIDER_SIZE,
    },
  }
);

// ─── Type Exports ──────────────────────────────────────────────────────────
export type SliderVariantProp = NonNullable<
  Parameters<typeof sliderRangeVariants>[0]
>['variant'];
export type SliderSizeProp = NonNullable<
  Parameters<typeof sliderThumbVariants>[0]
>['size'];