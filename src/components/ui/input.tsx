// src/components/ui/Input.tsx
"use client";

import { forwardRef } from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";
import { inputVariants, type InputVariant, type InputSize } from "@/lib/constants/components/ui/input_variants";

// Omit 'size' from native HTML attributes to avoid conflict
export interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  variant?: InputVariant;
  inputSize?: InputSize;  // Renamed to avoid conflict with native 'size'
  withIcon?: "left" | "right" | "both";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", inputSize = "md", withIcon, iconLeft, iconRight, className, ...props }, ref) => {
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
            inputVariants({ variant, size: inputSize, withIcon }),
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