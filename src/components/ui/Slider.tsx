// src/components/ui/Slider.tsx
"use client";

import { forwardRef } from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";
import { sliderTrackVariants, sliderRangeVariants, sliderThumbVariants, type SliderVariant } from "@/lib/constants/components/ui/slider_variants";
import React from "react";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue' | 'size'> {
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
  
  /** Visual variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'purple';
  
  /** Size of the slider */
  size?: 'sm' | 'md' | 'lg';
  
  /** Show marks at intervals */
  marks?: boolean;
  
  /** Mark interval (when marks is true) */
  markInterval?: number;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ 
    className,
    value: controlledValue,
    defaultValue = 50,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    label,
    helperText,
    showValue = false,
    formatValue = (v) => v.toString(),
    variant = 'default',
    size = 'md',
    marks = false,
    markInterval = 10,
    disabled = false,
    ...props 
  }, ref) => {
    
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    // Variant colors
    const variantColors = {
      default: 'bg-cyan-500',
      primary: 'bg-purple-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      purple: 'bg-indigo-500',
    };

    // Size styles
    const sizeStyles = {
      sm: {
        track: 'h-1',
        thumb: 'h-3 w-3',
        value: 'text-xs',
      },
      md: {
        track: 'h-1.5',
        thumb: 'h-4 w-4',
        value: 'text-sm',
      },
      lg: {
        track: 'h-2',
        thumb: 'h-5 w-5',
        value: 'text-base',
      },
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      
      if (!isControlled) {
        setInternalValue(newValue);
      }
      
      onChange?.(newValue);
    };

    // Calculate percentage for fill
    const percentage = ((currentValue - min) / (max - min)) * 100;

    // Generate marks
    const marks_array = marks
      ? Array.from({ length: Math.floor((max - min) / markInterval) + 1 }, (_, i) => min + i * markInterval)
      : [];

    return (
      <div className={cn('space-y-2', className)}>
        {/* Label and value row */}
        {(label || showValue) && (
          <div className="flex justify-between items-center">
            {label && (
              <label className="text-sm font-medium text-white/80">
                {label}
              </label>
            )}
            {showValue && (
              <span className={cn(
                'font-mono text-white/60',
                sizeStyles[size].value
              )}>
                {formatValue(currentValue)}
              </span>
            )}
          </div>
        )}

        {/* Slider container */}
        <div className="relative py-2">
          {/* Track background */}
          <div className={cn(
            'w-full rounded-full bg-white/10',
            sizeStyles[size].track
          )} />

          {/* Filled track */}
          <div
            className={cn(
              'absolute top-2 left-0 rounded-full',
              variantColors[variant],
              sizeStyles[size].track
            )}
            style={{ width: `${percentage}%` }}
          />

          {/* Marks */}
          {marks && (
            <div className="absolute top-2 left-0 w-full flex justify-between px-0.5">
              {marks_array.map((mark) => (
                <div
                  key={mark}
                  className={cn(
                    'w-0.5 bg-white/20',
                    sizeStyles[size].track
                  )}
                  style={{ height: sizeStyles[size].track }}
                />
              ))}
            </div>
          )}

          {/* Native range input (visually hidden but functional) */}
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-label={label || 'Slider'}
            {...props}
          />

          {/* Custom thumb (visual only) */}
          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg pointer-events-none',
              sizeStyles[size].thumb,
              disabled && 'opacity-50'
            )}
            style={{ left: `calc(${percentage}% - ${parseInt(sizeStyles[size].thumb) / 2}px)` }}
          />
        </div>

        {/* Helper text */}
        {helperText && (
          <p className="text-xs text-white/40">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';