// @/components/ui/Button.tsx
// Enhanced Button with variant system (optional, keeps neutral foundation)

"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center select-none outline-none disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 ease-quantum focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-quantum-purple text-white hover:bg-quantum-dark focus:ring-quantum-light",
        primary: "bg-quantum-purple text-white hover:bg-quantum-dark",
        secondary: "bg-cosmic-blue text-white hover:bg-cosmic-dark",
        outline: "border border-star-dust/20 bg-transparent hover:bg-star-dust/10",
        ghost: "hover:bg-star-dust/10",
        destructive: "bg-fire-base text-white hover:bg-fire-dark",
        success: "bg-sanctuary-green text-white hover:bg-sanctuary-emerald",
        warning: "bg-hearth-gold text-deep-space hover:bg-hearth-orange",
      },
      size: {
        default: "h-8 px-3 py-1.5 text-sm rounded-lg",
        xs: "h-6 px-2 py-0.5 text-xs rounded-md",
        sm: "h-7 px-2.5 py-1 text-sm rounded-md",
        lg: "h-9 px-4 py-2 text-base rounded-lg",
        xl: "h-10 px-6 py-2.5 text-lg rounded-xl",
        icon: "h-8 w-8 p-0 rounded-lg",
        "icon-xs": "h-6 w-6 p-0 rounded-md",
        "icon-sm": "h-7 w-7 p-0 rounded-md",
        "icon-lg": "h-9 w-9 p-0 rounded-lg",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, children, ...props }, ref) => {
    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {children}
      </ButtonPrimitive>
    );
  }
);

Button.displayName = "Button";

export { Button };