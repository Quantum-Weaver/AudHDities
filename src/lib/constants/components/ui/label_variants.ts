// src/lib/constants/components/ui/label_variants.ts
import { cva } from "class-variance-authority";

export const labelVariants = cva(
  "block font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        default: "text-white/80",
        required: "text-white/80 after:content-['*'] after:ml-0.5 after:text-red-400",
        optional: "text-white/80 after:content-['(optional)'] after:ml-1 after:text-white/40 after:text-xs after:font-normal",
        error: "text-red-400",
        floating: "absolute left-3 transition-all duration-200 pointer-events-none",
      },
      size: {
        sm: "text-xs mb-1",
        md: "text-sm mb-1.5",
        lg: "text-base mb-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type LabelVariant = NonNullable<Parameters<typeof labelVariants>[0]>['variant'];
export type LabelSize = NonNullable<Parameters<typeof labelVariants>[0]>['size'];