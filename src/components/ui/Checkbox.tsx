// src/components/ui/Checkbox.tsx
"use client";

import { forwardRef } from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "@/lib/utils";
import { checkboxVariants, type CheckboxVariant, type CheckboxSize } from "@/lib/constants/components/ui/checkbox_variants";

export interface CheckboxProps extends CheckboxPrimitive.Root.Props {
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  label?: string;
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ variant = "default", size = "md", label, className, children, ...props }, ref) => {
    const content = (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(checkboxVariants({ variant, size }), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (label) {
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          {content}
          <span className="text-sm text-white/80">{label}</span>
        </label>
      );
    }

    return content;
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };