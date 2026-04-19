// src/lib/constants/components/ui/Textarea_variants.ts
import { cva } from "class-variance-authority";

export const TextareaVariants = cva(
  "w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-all duration-200 outline-none placeholder:text-star-dust/40 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical",
  {
    variants: {
      variant: {
        default: "border-white/10 focus:border-neurospark focus:ring-1 focus:ring-neurospark/50",
        error: "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50",
        success: "border-green-500/50 focus:border-green-500 focus:ring-1 focus:ring-green-500/50",
        warning: "border-yellow-500/50 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50",
        filled: "bg-white/5 border-white/10 focus:border-neurospark focus:ring-1 focus:ring-neurospark/50",
      },
      size: {
        sm: "text-xs min-h-[80px]",
        md: "text-sm min-h-[100px]",
        lg: "text-base min-h-[120px]",
      },
      resizable: {
        true: "resize",
        false: "resize-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      resizable: true,
    },
  }
);

export type TextareaVariant = NonNullable<Parameters<typeof TextareaVariants>[0]>['variant'];
export type TextareaSize = NonNullable<Parameters<typeof TextareaVariants>[0]>['size'];