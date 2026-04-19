// components/ui/Select.tsx
// Select Component - The choice gateway
// Allows users to select from a list of options

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
  /** Size of the select (renamed to avoid conflict) */
  selectSize?: SelectSize;
  /** Options for the select */
  options?: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Show required indicator */
  required?: boolean;
  /** Show optional indicator */
  optional?: boolean;
  /** Full width */
  fullWidth?: boolean;
}

const sizeClasses: Record<SelectSize, string> = {
  sm: 'px-2 py-1 text-sm h-8',
  md: 'px-3 py-2 text-base h-10',
  lg: 'px-4 py-3 text-lg h-12',
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helper,
      selectSize = 'md',
      options,
      placeholder,
      required = false,
      optional = false,
      fullWidth = true,
      className,
      id,
      disabled,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;
    
    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'text-sm font-medium text-white/80',
              hasError && 'text-red-400'
            )}
          >
            {label}
            {required && <span className="ml-1 text-cyan-400">*</span>}
            {optional && <span className="ml-1 text-white/40 text-xs">(optional)</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'rounded-lg border transition-all duration-200 appearance-none',
              'bg-white/5 border-white/10',
              'text-white',
              'focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              sizeClasses[selectSize],
              hasError && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
              fullWidth && 'w-full',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              helper ? `${selectId}-helper` : hasError ? `${selectId}-error` : undefined
            }
            disabled={disabled}
            defaultValue={defaultValue || (placeholder ? '' : undefined)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-white/60">
                {placeholder}
              </option>
            )}
            {options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-surface text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none h-4 w-4" />
        </div>
        
        {helper && !hasError && (
          <p id={`${selectId}-helper`} className="text-xs text-white/40">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p id={`${selectId}-error`} className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';