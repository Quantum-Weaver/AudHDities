// src/lib/constants/components/ui/select_variants.ts
import { cva } from "class-variance-authority";

export const selectVariants = cva(
  "w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-all duration-200 outline-none appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-white/10 focus:border-neurospark focus:ring-1 focus:ring-neurospark/50",
        error: "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50",
        success: "border-green-500/50 focus:border-green-500 focus:ring-1 focus:ring-green-500/50",
        filled: "bg-white/5 border-white/10 focus:border-neurospark focus:ring-1 focus:ring-neurospark/50",
      },
      size: {
        sm: "h-7 px-2 text-xs",
        md: "h-8 px-3 text-sm",
        lg: "h-10 px-4 text-base",
      },
      native: {
        true: "appearance-auto",
        false: "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E')] bg-[position:right_0.75rem_center] bg-[size:1rem] bg-no-repeat pr-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      native: false,
    },
  }
);

export type SelectVariant = NonNullable<Parameters<typeof selectVariants>[0]>['variant'];
export type SelectSize = NonNullable<Parameters<typeof selectVariants>[0]>['size'];