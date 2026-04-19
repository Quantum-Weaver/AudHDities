// components/ui/Input.tsx
// Input Component - The gateway for text entry
// Collects single-line text input from users

import React from 'react';
import { cn } from '@/lib/utils';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'glass' | 'outline';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
  /** Size of the input (renamed from 'size' to avoid conflict with native input size) */
  inputSize?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Show required indicator */
  required?: boolean;
  /** Show optional indicator */
  optional?: boolean;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'px-2 py-1 text-sm h-8',
  md: 'px-3 py-2 text-base h-10',
  lg: 'px-4 py-3 text-lg h-12',
};

const variantClasses: Record<InputVariant, string> = {
  default: 'bg-white/5 border-white/10 focus:border-cyan-400',
  glass: 'bg-white/10 backdrop-blur-sm border-white/20 focus:border-cyan-400',
  outline: 'bg-transparent border-white/20 focus:border-cyan-400',
};

/**
 * Input Component
 * 
 * @example
 * <Input label="Email" placeholder="you@example.com" />
 * 
 * @example
 * <Input label="Password" type="password" error="Password is required" />
 * 
 * @example
 * <Input leftIcon={<MailIcon />} placeholder="Email" />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      inputSize = 'md',
      variant = 'default',
      required = false,
      optional = false,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;
    
    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
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
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'rounded-lg border transition-all duration-200',
              'placeholder:text-white/30',
              'focus:outline-none focus:ring-2 focus:ring-cyan-400/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              sizeClasses[inputSize],
              variantClasses[variant],
              hasError && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              fullWidth && 'w-full',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              helper ? `${inputId}-helper` : hasError ? `${inputId}-error` : undefined
            }
            disabled={disabled}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
              {rightIcon}
            </div>
          )}
        </div>
        
        {helper && !hasError && (
          <p id={`${inputId}-helper`} className="text-xs text-white/40">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p id={`${inputId}-error`} className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';