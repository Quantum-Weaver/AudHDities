// src/components/ui/Slider.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SLIDER COMPONENT                                       ║
// ║                    Range input with COSMIC styling                        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { SliderProps } from '@/types/components/forging/slider.types';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
} from '@/lib/constants/components/ui/slider.variants';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  SLIDER_VALUE_COLOR_CLASSES,
  SLIDER_VALUE_SIZE_CLASSES,
  SLIDER_TRACK_SIZE_CLASSES,
  SLIDER_THUMB_PIXEL_SIZE,
  SLIDER_LABEL_COLOR_CLASS,
  SLIDER_HELPER_TEXT_COLOR_CLASS,
  SLIDER_MARK_COLOR_CLASS,
  SLIDER_CONTAINER_SPACING,
  SLIDER_TRACK_CONTAINER_SPACING,
  DEFAULT_SLIDER_VARIANT,
  DEFAULT_SLIDER_SIZE,
  DEFAULT_SLIDER_MIN,
  DEFAULT_SLIDER_MAX,
  DEFAULT_SLIDER_STEP,
} from '@/lib/constants/components/ui/slider.constants';

// ═══════════════════════════════════════════════════════════════════════════
// SLIDER
// ═══════════════════════════════════════════════════════════════════════════

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
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    };

    const percentage = ((currentValue - min) / (max - min)) * 100;
    const thumbOffset = SLIDER_THUMB_PIXEL_SIZE[size] / 2;

    const marksArray = marks
      ? Array.from(
          { length: Math.floor((max - min) / markInterval) + 1 },
          (_, i) => min + i * markInterval
        )
      : [];

    return (
      <div className={cn(SLIDER_CONTAINER_SPACING, className)}>
        {/* Label + Value Row */}
        {(label || showValue) && (
          <div className="flex justify-between items-center">
            {label && (
              <label className={cn('text-sm font-medium', SLIDER_LABEL_COLOR_CLASS)}>
                {label}
              </label>
            )}
            {showValue && (
              <span
                className={cn(
                  'font-mono',
                  SLIDER_VALUE_SIZE_CLASSES[size],
                  SLIDER_VALUE_COLOR_CLASSES[variant]
                )}
              >
                {formatValue(currentValue)}
              </span>
            )}
          </div>
        )}

        {/* Track Container */}
        <div className={cn('relative', SLIDER_TRACK_CONTAINER_SPACING)}>
          {/* Background Track */}
          <div className={sliderTrackVariants({ variant, size })} />

          {/* Filled Track */}
          <div
            className={cn(
              'absolute top-2 left-0',
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
                  className={cn('w-0.5', SLIDER_MARK_COLOR_CLASS, SLIDER_TRACK_SIZE_CLASSES[size])}
                />
              ))}
            </div>
          )}

          {/* Native Range Input (accessible, visually hidden) */}
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
            aria-label={label || 'Slider'}
          />

          {/* Custom Thumb (visual only) */}
          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none',
              sliderThumbVariants({ variant, size }),
              disabled && 'opacity-50'
            )}
            style={{ left: `calc(${percentage}% - ${thumbOffset}px)` }}
          />
        </div>

        {/* Helper Text */}
        {helperText && (
          <p className={cn('text-xs', SLIDER_HELPER_TEXT_COLOR_CLASS)}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

// ─── Re-export types ───────────────────────────────────────────────────────
export type { SliderProps, SliderVariant, SliderSize } from '@/types/components/forging/slider.types';