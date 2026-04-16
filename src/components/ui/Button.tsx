// src/components/ui/Button.tsx
"use client";

import { forwardRef } from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariant, type ButtonSize } from "@/lib/constants/components/ui/button_variants";

export interface ButtonProps extends ButtonPrimitive.Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", fullWidth, className, children, ...props }, ref) => {
    return (
      <ButtonPrimitive
        ref={ref}
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