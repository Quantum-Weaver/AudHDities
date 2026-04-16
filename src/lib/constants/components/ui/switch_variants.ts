// src/lib/constants/components/ui/switch_variants.ts
import { cva } from "class-variance-authority";

export const switchVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-quantum-purple/50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white/20 data-[state=checked]:bg-quantum-purple",
        quantum: "bg-white/20 data-[state=checked]:bg-quantum-purple",
        cosmic: "bg-white/20 data-[state=checked]:bg-cosmic-blue",
        fire: "bg-white/20 data-[state=checked]:bg-fire-base",
        sanctuary: "bg-white/20 data-[state=checked]:bg-sanctuary-green",
      },
      size: {
        sm: "h-4 w-7",
        md: "h-5 w-9",
        lg: "h-6 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
  {
    variants: {
      size: {
        sm: "h-3 w-3 translate-x-0.5 data-[state=checked]:translate-x-3",
        md: "h-4 w-4 translate-x-0.5 data-[state=checked]:translate-x-4",
        lg: "h-5 w-5 translate-x-0.5 data-[state=checked]:translate-x-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type SwitchVariant = NonNullable<Parameters<typeof switchVariants>[0]>['variant'];
export type SwitchSize = NonNullable<Parameters<typeof switchVariants>[0]>['size'];