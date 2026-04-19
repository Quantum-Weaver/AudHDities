// components/ui/Label.tsx
// Label Component - The identifier for form fields
// Provides consistent labeling with required/optional indicators

import React from 'react';
import { cn } from '@/lib/utils';

export type LabelSize = 'sm' | 'md' | 'lg';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Size of the label */
  size?: LabelSize;
  /** Show required indicator (*) */
  required?: boolean;
  /** Show optional indicator text */
  optional?: boolean;
  /** Error state (changes text color) */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

const sizeClasses: Record<LabelSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

/**
 * Label Component
 * 
 * @example
 * <Label htmlFor="email" required>Email Address</Label>
 * 
 * @example
 * <Label htmlFor="bio" optional>Biography</Label>
 * 
 * @example
 * <Label htmlFor="name" error>Name is required</Label>
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      size = 'md',
      required = false,
      optional = false,
      error = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const colorClasses = cn(
      'font-medium transition-colors duration-200',
      error && 'text-red-400',
      disabled && 'text-white/40',
      !error && !disabled && 'text-white/80'
    );
    
    return (
      <label
        ref={ref}
        className={cn(
          sizeClasses[size],
          colorClasses,
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="ml-1 text-cyan-400">*</span>}
        {optional && <span className="ml-1 text-white/40 text-xs">(optional)</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';