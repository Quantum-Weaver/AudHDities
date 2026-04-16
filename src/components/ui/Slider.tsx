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
  ({ variant = "default", className, ...props }, ref) => {
    const values = props.value ?? props.defaultValue ?? [0];
    const isRange = values.length > 1;

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <SliderPrimitive.Control className="relative w-full">
          <SliderPrimitive.Track className={cn(sliderTrackVariants({ variant }))}>
            <SliderPrimitive.Indicator className={cn(sliderRangeVariants({ variant }))} />
          </SliderPrimitive.Track>
          {values.map((_, index) => (
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