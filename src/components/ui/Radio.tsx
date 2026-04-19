// components/ui/Radio.tsx
// Radio Component - The exclusive choice gateway
// Allows users to select one option from a group

import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

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

export interface RadioGroupProps {
  /** Name of the radio group */
  name: string;
  /** Current value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Size of radio buttons */
  size?: RadioSize;
  /** Children (Radio components) */
  children: React.ReactNode;
  className?: string;
}

/**
 * RadioGroup - Container for radio buttons
 * 
 * @example
 * <RadioGroup name="payment" value="card" onChange={setPaymentMethod}>
 *   <Radio value="card">Credit Card</Radio>
 *   <Radio value="paypal">PayPal</Radio>
 * </RadioGroup>
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, value, onChange, size = 'md', children, className }, ref) => {
    const contextValue: RadioGroupContextValue = {
      name,
      value,
      onChange,
      size,
    };
    
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

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Value of this radio option */
  value: string;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
}

const radioSizeClasses = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const radioLabelSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

/**
 * Radio - Individual radio button (must be used within RadioGroup)
 */
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
                'bg-white/5 border-white/20',
                'checked:bg-cyan-500 checked:border-cyan-500',
                'focus:outline-none focus:ring-2 focus:ring-cyan-400/20',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'cursor-pointer',
                radioSizeClasses[size],
                hasError && 'border-red-400',
                className
              )}
              aria-invalid={hasError}
              aria-describedby={
                helper ? `${radioId}-helper` : hasError ? `${radioId}-error` : undefined
              }
              disabled={disabled}
              {...props}
            />
            <div
              className={cn(
                'absolute rounded-full bg-white transition-all',
                size === 'sm' && 'h-1.5 w-1.5',
                size === 'md' && 'h-2 w-2',
                size === 'lg' && 'h-2.5 w-2.5',
                isChecked ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>
          
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                'text-white/80 cursor-pointer select-none',
                radioLabelSizeClasses[size],
                disabled && 'opacity-50 cursor-not-allowed',
                hasError && 'text-red-400'
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {helper && !hasError && (
          <p id={`${radioId}-helper`} className="text-xs text-white/40 pl-6">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p id={`${radioId}-error`} className="text-xs text-red-400 pl-6">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Radio.displayName = 'Radio';