// src/lib/constants/components/ui/card_variants.ts
import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "rounded-xl overflow-hidden transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-white/5 border border-white/10",
        interactive: "bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer",
        glass: "bg-white/5 backdrop-blur-md border border-white/10",
        glow: "bg-white/5 border border-cyan-500/30 shadow-lg shadow-cyan-500/10",
        elevated: "bg-white/5 border border-white/10 shadow-xl",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        full: "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type CardVariant = NonNullable<Parameters<typeof cardVariants>[0]>['variant'];
export type CardSize = NonNullable<Parameters<typeof cardVariants>[0]>['size'];