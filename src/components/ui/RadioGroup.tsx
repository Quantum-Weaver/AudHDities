// src/components/ui/RadioGroup.tsx
"use client";

import { forwardRef } from "react";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "@/lib/utils";
import { radioVariants, type RadioVariant, type RadioSize } from "@/lib/constants/components/ui/radio_variants";

export interface RadioGroupProps extends RadioGroupPrimitive.Props {
  variant?: RadioVariant;
  size?: RadioSize;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ variant = "default", size = "md", className, children, ...props }, ref) => {
    return (
      <RadioGroupPrimitive
        ref={ref}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {children}
      </RadioGroupPrimitive>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export interface RadioItemProps extends RadioPrimitive.Root.Props {
  variant?: RadioVariant;
  size?: RadioSize;
  label?: string;
}

const RadioItem = forwardRef<HTMLButtonElement, RadioItemProps>(
  ({ variant = "default", size = "md", label, className, ...props }, ref) => {
    const content = (
      <RadioPrimitive.Root
        ref={ref}
        className={cn(radioVariants({ variant, size }), className)}
        {...props}
      >
        <RadioPrimitive.Indicator className="flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-current" />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Root>
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

RadioItem.displayName = "RadioItem";

export { RadioGroup, RadioItem };