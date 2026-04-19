// components/ui/Checkbox.tsx
// Checkbox Component - The binary choice gateway
// Allows users to select yes/no or multiple options

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
  /** Size of the checkbox */
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const labelSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

/**
 * Checkbox Component
 * 
 * @example
 * <Checkbox label="I agree to the terms" />
 * 
 * @example
 * <Checkbox label="Subscribe to newsletter" defaultChecked />
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helper,
      size = 'md',
      className,
      id,
      disabled,
      checked,
      defaultChecked,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;
    
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              className={cn(
                'appearance-none rounded border transition-all duration-200',
                'bg-white/5 border-white/20',
                'checked:bg-cyan-500 checked:border-cyan-500',
                'focus:outline-none focus:ring-2 focus:ring-cyan-400/20',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'cursor-pointer',
                sizeClasses[size],
                hasError && 'border-red-400',
                className
              )}
              checked={checked}
              defaultChecked={defaultChecked}
              aria-invalid={hasError}
              aria-describedby={
                helper ? `${checkboxId}-helper` : hasError ? `${checkboxId}-error` : undefined
              }
              disabled={disabled}
              {...props}
            />
            <Check
              className={cn(
                'absolute pointer-events-none text-white transition-opacity',
                'h-2 w-2',
                size === 'sm' && 'h-2 w-2',
                size === 'md' && 'h-2.5 w-2.5',
                size === 'lg' && 'h-3 w-3',
                (checked || defaultChecked) ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>
          
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'text-white/80 cursor-pointer select-none',
                labelSizeClasses[size],
                disabled && 'opacity-50 cursor-not-allowed',
                hasError && 'text-red-400'
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {helper && !hasError && (
          <p id={`${checkboxId}-helper`} className="text-xs text-white/40 pl-6">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p id={`${checkboxId}-error`} className="text-xs text-red-400 pl-6">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';