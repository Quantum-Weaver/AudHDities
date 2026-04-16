// src/components/ui/Select.tsx
"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { selectVariants, type SelectVariant, type SelectSize } from "@/lib/constants/components/ui/select_variants";

// Omit 'size' from native select attributes
export interface SelectProps extends Omit<React.ComponentProps<"select">, "size"> {
  variant?: SelectVariant;
  selectSize?: SelectSize;  // Renamed to avoid conflict
  native?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ variant = "default", selectSize = "md", native = false, className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(selectVariants({ variant, size: selectSize, native }), className)}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export { Select };