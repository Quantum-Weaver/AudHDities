// src/components/ui/Slider.tsx
"use client";

import { forwardRef } from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";
import { sliderTrackVariants, sliderRangeVariants, sliderThumbVariants, type SliderVariant } from "@/lib/constants/components/ui/slider_variants";

export interface SliderProps extends SliderPrimitive.Root.Props {
  variant?: SliderVariant;
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ variant = "default", className, value, defaultValue, ...props }, ref) => {
    // Normalize values to array (handle both single number and array)
    let values: number[];
    if (value !== undefined) {
      values = Array.isArray(value) ? value : [value];
    } else if (defaultValue !== undefined) {
      values = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    } else {
      values = [0];
    }
    
    const isRange = values.length > 1;

    return (
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <SliderPrimitive.Control className="relative w-full">
          <SliderPrimitive.Track className={cn(sliderTrackVariants({ variant }))}>
            <SliderPrimitive.Indicator className={cn(sliderRangeVariants({ variant }))} />
          </SliderPrimitive.Track>
          {values.map((_: number, index: number) => (
            <SliderPrimitive.Thumb
              key={index}
              index={index}
              className={cn(sliderThumbVariants({ variant }))}
            />
          ))}
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };