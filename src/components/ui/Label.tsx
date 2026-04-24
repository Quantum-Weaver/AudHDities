// components/ui/Label.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { labelVariants } from '@/lib/constants/components/ui/label_variants';
import type { LabelVariant, LabelSize } from '@/lib/constants/components/ui/label_variants';

export type { LabelSize };

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
    // Determine variant from props
    let variant: LabelVariant = 'default';
    if (error) variant = 'error';
    else if (required) variant = 'required';
    else if (optional) variant = 'optional';
    
    return (
      <label
        ref={ref}
        className={cn(
          labelVariants({ variant, size }),
          disabled && 'opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';