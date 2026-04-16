// src/components/ui/Input.tsx
"use client";

import { forwardRef } from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";
import { inputVariants, type InputVariant, type InputSize } from "@/lib/constants/components/ui/input_variants";

export interface InputProps extends React.ComponentProps<"input"> {
  variant?: InputVariant;
  size?: InputSize;
  withIcon?: "left" | "right" | "both";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", size = "md", withIcon, iconLeft, iconRight, className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {iconLeft && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            {iconLeft}
          </div>
        )}
        <InputPrimitive
          ref={ref}
          className={cn(
            inputVariants({ variant, size, withIcon }),
            className
          )}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
            {iconRight}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };