"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
} from "@/lib/constants/components/ui/slider.variants";
import type {
  SliderVariant,
  SliderSize,
} from "@/lib/constants/components/ui/slider.constants";
import {
  SLIDER_VALUE_COLOR_CLASSES,
  SLIDER_VALUE_SIZE_CLASSES,
  SLIDER_TRACK_SIZE_CLASSES,
  SLIDER_THUMB_SIZE_CLASSES,
  DEFAULT_SLIDER_VARIANT,
  DEFAULT_SLIDER_SIZE,
  DEFAULT_SLIDER_MIN,
  DEFAULT_SLIDER_MAX,
  DEFAULT_SLIDER_STEP,
} from "@/lib/constants/components/ui/slider.constants";

export interface SliderProps {
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Optional label */
  label?: string;
  /** Optional helper text */
  helperText?: string;
  /** Show value indicator */
  showValue?: boolean;
  /** Format function for value display */
  formatValue?: (value: number) => string;
  /** Visual variant derived from COSMIC tokens */
  variant?: SliderVariant;
  /** Size of the slider */
  size?: SliderSize;
  /** Show marks at intervals */
  marks?: boolean;
  /** Mark interval (when marks is true) */
  markInterval?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 50,
      min = DEFAULT_SLIDER_MIN,
      max = DEFAULT_SLIDER_MAX,
      step = DEFAULT_SLIDER_STEP,
      onChange,
      label,
      helperText,
      showValue = false,
      formatValue = (v) => v.toString(),
      variant = DEFAULT_SLIDER_VARIANT,
      size = DEFAULT_SLIDER_SIZE,
      marks = false,
      markInterval = 10,
      disabled = false,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    };

    // Calculate percentage for fill width
    const percentage = ((currentValue - min) / (max - min)) * 100;

    // Generate marks
    const marksArray = marks
      ? Array.from(
          { length: Math.floor((max - min) / markInterval) + 1 },
          (_, i) => min + i * markInterval
        )
      : [];

    // Thumb width in pixels for positioning offset
    const thumbSizeMap: Record<SliderSize, number> = { sm: 12, md: 16, lg: 20 };
    const thumbOffset = thumbSizeMap[size] / 2;

    return (
      <div className={cn("space-y-2", className)}>
        {/* Label and value row */}
        {(label || showValue) && (
          <div className="flex justify-between items-center">
            {label && (
              <label className="text-sm font-medium text-[var(--color-star-dust)]/80">
                {label}
              </label>
            )}
            {showValue && (
              <span
                className={cn(
                  "font-mono",
                  SLIDER_VALUE_SIZE_CLASSES[size],
                  SLIDER_VALUE_COLOR_CLASSES[variant]
                )}
              >
                {formatValue(currentValue)}
              </span>
            )}
          </div>
        )}

        {/* Slider container */}
        <div className="relative py-2">
          {/* Track background */}
          <div className={cn(sliderTrackVariants({ variant, size }))} />

          {/* Filled track */}
          <div
            className={cn(
              "absolute top-2 left-0",
              sliderRangeVariants({ variant }),
              SLIDER_TRACK_SIZE_CLASSES[size]
            )}
            style={{ width: `${percentage}%` }}
          />

          {/* Marks */}
          {marks && marksArray.length > 0 && (
            <div className="absolute top-2 left-0 w-full flex justify-between">
              {marksArray.map((mark) => (
                <div
                  key={mark}
                  className={cn(
                    "w-0.5 bg-white/20",
                    SLIDER_TRACK_SIZE_CLASSES[size]
                  )}
                />
              ))}
            </div>
          )}

          {/* Native range input (visually hidden but functional for accessibility) */}
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-label={label || "Slider"}
          />

          {/* Custom thumb (visual only) */}
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none",
              sliderThumbVariants({ variant, size }),
              disabled && "opacity-50"
            )}
            style={{
              left: `calc(${percentage}% - ${thumbOffset}px)`,
            }}
          />
        </div>

        {/* Helper text */}
        {helperText && (
          <p className="text-xs text-[var(--color-star-dust)]/40">{helperText}</p>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";