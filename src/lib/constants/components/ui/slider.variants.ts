import { cva } from "class-variance-authority";
import {
  SLIDER_RANGE_COLOR_CLASSES,
  SLIDER_TRACK_SIZE_CLASSES,
  SLIDER_THUMB_SIZE_CLASSES,
  SLIDER_FOCUS_COLOR_CLASSES,
  DEFAULT_SLIDER_VARIANT,
  DEFAULT_SLIDER_SIZE,
} from "./slider.constants";

// ============================================================================
// SLIDER TRACK VARIANTS
// ============================================================================

export const sliderTrackVariants = cva(
  "relative w-full grow rounded-full bg-white/10",
  {
    variants: {
      variant: {
        default: "",
        quantum: "",
        cosmic: "",
        fire: "",
        sanctuary: "",
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

// ============================================================================
// SLIDER RANGE (FILL) VARIANTS
// ============================================================================

export const sliderRangeVariants = cva(
  "absolute h-full rounded-full",
  {
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
  }
);

// ============================================================================
// SLIDER THUMB VARIANTS
// ============================================================================

export const sliderThumbVariants = cva(
  "block rounded-full border border-white/20 bg-white shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
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

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type SliderVariant = NonNullable<Parameters<typeof sliderRangeVariants>[0]>['variant'];
export type SliderSize = NonNullable<Parameters<typeof sliderThumbVariants>[0]>['size'];