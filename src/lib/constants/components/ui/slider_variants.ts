// src/lib/constants/components/ui/slider_variants.ts
import { cva } from "class-variance-authority";

export const sliderTrackVariants = cva(
  "relative h-1.5 w-full grow rounded-full bg-white/10",
  {
    variants: {
      variant: {
        default: "",
        quantum: "",
        cosmic: "",
        fire: "",
        sanctuary: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const sliderRangeVariants = cva(
  "absolute h-full rounded-full",
  {
    variants: {
      variant: {
        default: "bg-quantum-purple",
        quantum: "bg-quantum-purple",
        cosmic: "bg-cosmic-blue",
        fire: "bg-fire-base",
        sanctuary: "bg-sanctuary-green",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const sliderThumbVariants = cva(
  "block h-4 w-4 rounded-full border border-white/20 bg-white shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quantum-purple/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        quantum: "",
        cosmic: "",
        fire: "",
        sanctuary: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type SliderVariant = NonNullable<Parameters<typeof sliderRangeVariants>[0]>['variant'];