// src/components/ui/Select.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' > {
  /** Array of options to display */
  options?: SelectOption[];
  
  /** Visual style variant */
  variant?: 'default' | 'error' | 'success' | 'ghost';
  
  /** Size of the select */
  size?: 'sm' | 'md' | 'lg';
  
  /** Optional label text */
  label?: string;
  
  /** Optional helper text */
  helperText?: string;
  
  /** Error message (overrides helperText when present) */
  error?: string;
  
  /** Success message */
  success?: string;
  
  /** Whether the field is required */
  required?: boolean;
  
  /** Full width */
  fullWidth?: boolean;
  
  /** Custom icon component */
  icon?: React.ReactNode;
  
  /** Loading state */
  loading?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className,
    options = [],
    variant = 'default',
    size = 'md',
    label,
    helperText,
    error,
    success,
    required,
    fullWidth = false,
    icon,
    loading = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    
    // Determine which message to show
    const message = error || success || helperText;
    const messageType = error ? 'error' : success ? 'success' : 'default';

    // Variant styles
    const variantStyles = {
      default: 'border-white/10 bg-white/5 text-white focus:border-cyan-500 focus:ring-cyan-500/20',
      error: 'border-red-500/50 bg-red-500/5 text-white focus:border-red-500 focus:ring-red-500/20',
      success: 'border-green-500/50 bg-green-500/5 text-white focus:border-green-500 focus:ring-green-500/20',
      ghost: 'border-transparent bg-transparent text-white hover:bg-white/5 focus:bg-white/5',
    };

    // Size styles
    const sizeStyles = {
      sm: 'h-8 text-xs py-1 pl-2 pr-8',
      md: 'h-10 text-sm py-2 pl-3 pr-10',
      lg: 'h-12 text-base py-3 pl-4 pr-12',
    };

    // Message color styles
    const messageStyles = {
      default: 'text-white/40',
      error: 'text-red-400',
      success: 'text-green-400',
    };

    // Loading/disabled styles
    const isDisabled = disabled || loading;

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-white/80">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        {/* Select wrapper */}
        <div className="relative">
          {/* Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </div>
          )}

          {/* Native Select with custom dropdown styling */}
          <style jsx>{`
            select option {
              background-color: #0f172a;  /* deep-space background */
              color: #f8fafc;             /* white text */
              padding: 8px 12px;
            }
            select option:hover,
            select option:focus,
            select option:checked {
              background: linear-gradient(135deg, #06b6d4, #8b5cf6);
              color: white;
            }
            select optgroup {
              background-color: #0f172a;
              color: #94a3b8;
            }
          `}</style>
          
          <select
            ref={ref}
            disabled={isDisabled}
            className={cn(
              'w-full appearance-none rounded-lg transition-all duration-200',
              'focus:outline-none focus:ring-2',
              variantStyles[variant],
              sizeStyles[size],
              icon && 'pl-10',
              isDisabled && 'opacity-50 cursor-not-allowed',
              fullWidth && 'w-full',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={message ? `${props.id || 'select'}-message` : undefined}
            {...props}
          >
            {/* Allow children to override options */}
            {children || options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
                className="bg-deep-space text-white py-2 px-3"
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
            ) : (
              <ChevronDown size={size === 'lg' ? 20 : size === 'md' ? 18 : 16} />
            )}
          </div>
        </div>

        {/* Message */}
        {message && (
          <p 
            id={`${props.id || 'select'}-message`}
            className={cn('text-xs text-green-400', messageStyles[messageType])}
          >
            {message}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };