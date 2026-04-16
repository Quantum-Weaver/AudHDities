// src/components/ui/Label.tsx
"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { labelVariants, type LabelVariant, type LabelSize } from "@/lib/constants/components/ui/label_variants";

export interface LabelProps extends React.ComponentProps<"label"> {
  variant?: LabelVariant;
  size?: LabelSize;
  htmlFor?: string;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ variant = "default", size = "md", className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label };