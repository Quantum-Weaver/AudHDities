// src/lib/constants/components/ui/input_variants.ts
import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-all duration-200 outline-none placeholder:text-star-dust/40 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-white/10 focus:border-neurospark focus:ring-1 focus:ring-neurospark/50",
        error: "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50",
        success: "border-green-500/50 focus:border-green-500 focus:ring-1 focus:ring-green-500/50",
        warning: "border-yellow-500/50 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50",
        filled: "bg-white/5 border-white/10 focus:border-neurospark focus:ring-1 focus:ring-neurospark/50",
        underlined: "border-t-0 border-r-0 border-l-0 rounded-none px-0 focus:ring-0",
      },
      size: {
        sm: "h-7 px-2 text-xs",
        md: "h-8 px-3 text-sm",
        lg: "h-10 px-4 text-base",
      },
      withIcon: {
        left: "pl-8",
        right: "pr-8",
        both: "pl-8 pr-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type InputVariant = NonNullable<Parameters<typeof inputVariants>[0]>['variant'];
export type InputSize = NonNullable<Parameters<typeof inputVariants>[0]>['size'];