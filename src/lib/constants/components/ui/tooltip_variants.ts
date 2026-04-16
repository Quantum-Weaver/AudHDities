// src/lib/constants/components/ui/tooltip_variants.ts
import { cva } from "class-variance-authority";

export const tooltipVariants = cva(
  "z-50 rounded-md px-2 py-1 text-xs font-medium shadow-lg transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-deep-space text-star-dust border border-white/10",
        light: "bg-white text-deep-space border border-white/20",
        quantum: "bg-quantum-purple text-white",
        cosmic: "bg-cosmic-blue text-white",
        fire: "bg-fire-base text-white",
        sanctuary: "bg-sanctuary-green text-white",
      },
      placement: {
        top: "mb-2",
        right: "ml-2",
        bottom: "mt-2",
        left: "mr-2",
      },
    },
    defaultVariants: {
      variant: "default",
      placement: "top",
    },
  }
);

export type TooltipVariant = NonNullable<Parameters<typeof tooltipVariants>[0]>['variant'];
export type TooltipPlacement = NonNullable<Parameters<typeof tooltipVariants>[0]>['placement'];