// src/components/ui/Input.tsx
'use client';

import { forwardRef, InputHTMLAttributes, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  // Base styles
  "w-full rounded-lg border bg-transparent px-4 py-2 text-white placeholder:text-center placeholder:text-white/40 transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20",
        error: "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
        success: "border-green-500/50 focus:border-green-500 focus:ring-green-500/20",
        ghost: "border-transparent bg-white/5 focus:bg-white/10 focus:ring-white/20",
      },
      inputSize: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
      fullWidth: true,
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    inputSize, 
    fullWidth, 
    label, 
    error, 
    helperText,
    leftIcon,
    rightIcon,
    id,
    disabled,
    type = 'text',
    ...props 
  }, ref) => {
    // Use React's useId hook for stable IDs across server/client
    const reactId = useId();
    const inputId = id || reactId;
    const hasError = !!error || variant === 'error';
    
    return (
      <div className={cn("space-y-2", fullWidth && "w-full")}>
        {/* Label */}
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-white/80"
          >
            {label}
          </label>
        )}
        
        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
              {leftIcon}
            </div>
          )}
          
          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            className={cn(
              inputVariants({ variant: hasError ? 'error' : variant, inputSize, fullWidth, className }),
              leftIcon && "pl-10",
              rightIcon && "pr-10"
            )}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          
          {/* Right icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
              {rightIcon}
            </div>
          )}
        </div>
        
        {/* Error or helper text */}
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-400">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-sm text-white/40">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };