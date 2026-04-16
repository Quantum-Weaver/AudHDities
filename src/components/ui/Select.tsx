// src/components/ui/Select.tsx
"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { selectVariants, type SelectVariant, type SelectSize } from "@/lib/constants/components/ui/select_variants";

export interface SelectProps extends React.ComponentProps<"select"> {
  variant?: SelectVariant;
  size?: SelectSize;
  native?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ variant = "default", size = "md", native = false, className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(selectVariants({ variant, size, native }), className)}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export { Select };