// components/ui/Radio.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

export type RadioSize = 'sm' | 'md' | 'lg';

interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
  size: RadioSize;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('Radio components must be used within a RadioGroup');
  }
  return context;
};

// ============================================================================
// CONSTANTS — derived from COSMIC tokens
// ============================================================================

const radioSizeClasses: Record<RadioSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const radioInnerSizeClasses: Record<RadioSize, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
};

const radioLabelSizeClasses: Record<RadioSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

// ============================================================================
// RADIO GROUP
// ============================================================================

export interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  size?: RadioSize;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, value, onChange, size = 'md', children, className }, ref) => {
    const contextValue: RadioGroupContextValue = { name, value, onChange, size };
    
    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div ref={ref} className={cn('flex flex-col gap-2', className)}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

// ============================================================================
// RADIO
// ============================================================================

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  value: string;
  label?: string;
  error?: string;
  helper?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ value, label, error, helper, className, id, disabled, ...props }, ref) => {
    const { name, value: groupValue, onChange, size } = useRadioGroup();
    const radioId = id || `radio-${Math.random().toString(36).slice(2, 9)}`;
    const isChecked = groupValue === value;
    const hasError = !!error;
    
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="radio"
              name={name}
              value={value}
              id={radioId}
              checked={isChecked}
              onChange={(e) => onChange(e.target.value)}
              className={cn(
                'appearance-none rounded-full border transition-all duration-200',
                'bg-[var(--color-surface)]/5 border-[var(--color-star-dust)]/20',
                'checked:bg-[var(--color-neurospark)] checked:border-[var(--color-neurospark)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--color-neurospark)]/20',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'cursor-pointer',
                radioSizeClasses[size],
                hasError && 'border-[var(--color-error)]',
                className
              )}
              aria-invalid={hasError || undefined}
              aria-describedby={
                helper ? `${radioId}-helper` : hasError ? `${radioId}-error` : undefined
              }
              disabled={disabled}
              {...props}
            />
            <div
              className={cn(
                'absolute rounded-full bg-white transition-all',
                radioInnerSizeClasses[size],
                isChecked ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>
          
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                'text-[var(--color-star-dust)]/80 cursor-pointer select-none',
                radioLabelSizeClasses[size],
                disabled && 'opacity-50 cursor-not-allowed',
                hasError && 'text-[var(--color-error)]'
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {helper && !hasError && (
          <p id={`${radioId}-helper`} className="text-xs text-[var(--color-star-dust)]/40 pl-6">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p id={`${radioId}-error`} className="text-xs text-[var(--color-error)] pl-6" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Radio.displayName = 'Radio';