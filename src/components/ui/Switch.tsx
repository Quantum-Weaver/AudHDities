// src/components/ui/Switch.tsx
"use client";

import { forwardRef } from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";
import { switchVariants, switchThumbVariants, type SwitchVariant, type SwitchSize } from "@/lib/constants/components/ui/switch_variants";

export interface SwitchProps extends SwitchPrimitive.Root.Props {
  variant?: SwitchVariant;
  size?: SwitchSize;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ variant = "default", size = "md", className, ...props }, ref) => {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        className={cn(switchVariants({ variant, size }), className)}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(switchThumbVariants({ size }))}
        />
      </SwitchPrimitive.Root>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };