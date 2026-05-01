// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SLIDER COMPONENT                                       ║
// ║                    Range input with COSMIC styling                        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

import type { SliderProps } from '@/types/components/forging/slider.types';

import {
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
} from '@/lib/constants/components/forging/slider.variants';

import {
  SLIDER_VALUE_COLOR_CLASSES,
  SLIDER_VALUE_SIZE_CLASSES,
  SLIDER_TRACK_SIZE_CLASSES,
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
} from '@/lib/constants/components/forging/slider.constants';

import {
  valueToPercentage,
  thumbPositionOffset,
  generateMarks,
  snapToStep,
} from '@/lib/utils/components/forging/slider.utils';

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Normalize defaultValue — accepts number or number[] */
function normalizeDefaultValue(v: number | number[] | undefined, fallback: number): number {
  if (v === undefined) return fallback;
  if (Array.isArray(v)) return v[0] ?? fallback;
  return v;
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDER
// ═══════════════════════════════════════════════════════════════════════════

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      min = DEFAULT_SLIDER_MIN,
      max = DEFAULT_SLIDER_MAX,
      step = DEFAULT_SLIDER_STEP,
      onChange,
      onValueChange,
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
    const normalizedDefault = normalizeDefaultValue(defaultValue, 50);
    const [internalValue, setInternalValue] = useState(normalizedDefault);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      const snapped = snapToStep(newValue, min, max, step);
      if (!isControlled) setInternalValue(snapped);
      onChange?.(snapped);
      onValueChange?.([snapped]);
    };

    const percentage = valueToPercentage(currentValue, min, max);
    const marksArray = marks ? generateMarks(min, max, markInterval) : [];

    return (
      <div className={cn(SLIDER_CONTAINER_SPACING, className)}>
        {(label || showValue) && (
          <div className="flex justify-between items-center">
            {label && (
              <label className={cn('text-sm font-medium', SLIDER_LABEL_COLOR_CLASS)}>
                {label}
              </label>
            )}
            {showValue && (
              <span className={cn('font-mono', SLIDER_VALUE_SIZE_CLASSES[size], SLIDER_VALUE_COLOR_CLASSES[variant])}>
                {formatValue(currentValue)}
              </span>
            )}
          </div>
        )}

        <div className={cn('relative', SLIDER_TRACK_CONTAINER_SPACING)}>
          <div className={sliderTrackVariants({ variant, size })} />

          <div
            className={cn('absolute top-2 left-0', sliderRangeVariants({ variant }), SLIDER_TRACK_SIZE_CLASSES[size])}
            style={{ width: `${percentage}%` }}
          />

          {marks && marksArray.length > 0 && (
            <div className="absolute top-2 left-0 w-full flex justify-between">
              {marksArray.map((mark) => (
                <div key={mark} className={cn('w-0.5', SLIDER_MARK_COLOR_CLASS, SLIDER_TRACK_SIZE_CLASSES[size])} />
              ))}
            </div>
          )}

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

          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none',
              sliderThumbVariants({ variant, size }),
              disabled && 'opacity-50'
            )}
            style={{ left: thumbPositionOffset(percentage, size) }}
          />
        </div>

        {helperText && (
          <p className={cn('text-xs', SLIDER_HELPER_TEXT_COLOR_CLASS)}>{helperText}</p>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export type { SliderProps, SliderVariant, SliderSize } from '@/types/components/forging/slider.types';