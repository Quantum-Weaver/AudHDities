// src/lib/constants/components/ui/button_variants.ts
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary: "bg-quantum-purple text-white hover:bg-quantum-dark focus-visible:ring-quantum-purple/50",
        secondary: "bg-cosmic-blue text-white hover:bg-cosmic-dark focus-visible:ring-cosmic-blue/50",
        outline: "border border-star-dust/20 bg-transparent hover:bg-star-dust/10 focus-visible:ring-star-dust/20",
        ghost: "hover:bg-star-dust/10 focus-visible:ring-star-dust/20",
        destructive: "bg-fire-base text-white hover:bg-fire-dark focus-visible:ring-fire-base/50",
        success: "bg-sanctuary-green text-white hover:bg-sanctuary-emerald focus-visible:ring-sanctuary-green/50",
        warning: "bg-hearth-gold text-deep-space hover:bg-hearth-orange focus-visible:ring-hearth-gold/50",
        link: "text-neurospark underline-offset-4 hover:underline focus-visible:ring-neurospark/50",
      },
      size: {
        xs: "h-6 px-2 text-xs rounded-md gap-1",
        sm: "h-7 px-3 text-sm rounded-md gap-1.5",
        md: "h-8 px-4 text-sm rounded-lg gap-2",
        lg: "h-9 px-5 text-base rounded-lg gap-2",
        xl: "h-10 px-6 text-base rounded-xl gap-2.5",
        icon: "h-8 w-8 p-0 rounded-lg",
        "icon-sm": "h-7 w-7 p-0 rounded-md",
        "icon-lg": "h-9 w-9 p-0 rounded-lg",
        "icon-xl": "h-10 w-10 p-0 rounded-xl",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonVariant = NonNullable<Parameters<typeof buttonVariants>[0]>['variant'];
export type ButtonSize = NonNullable<Parameters<typeof buttonVariants>[0]>['size'];