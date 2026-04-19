// components/ui/FormField.tsx
// FormField Component - The consistent form field unit
// Wraps label, input, and error/helper messages

import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './Label';

export type FormFieldSize = 'sm' | 'md' | 'lg';
export type FormFieldLayout = 'vertical' | 'horizontal';

export interface FormFieldProps {
  /** ID of the form field (should match input id) */
  id?: string;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text (shown when no error) */
  helper?: string;
  /** Size of the field */
  size?: FormFieldSize;
  /** Layout orientation */
  layout?: FormFieldLayout;
  /** Show required indicator */
  required?: boolean;
  /** Show optional indicator */
  optional?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** The form input/control */
  children: React.ReactNode;
  /** Additional className for the container */
  className?: string;
  /** Additional className for the label */
  labelClassName?: string;
  /** Additional className for the content wrapper */
  contentClassName?: string;
  /** Full width */
  fullWidth?: boolean;
}

const sizeClasses: Record<FormFieldSize, Record<string, string>> = {
  sm: {
    gap: 'gap-1',
    label: 'text-xs',
    helper: 'text-xs',
  },
  md: {
    gap: 'gap-1.5',
    label: 'text-sm',
    helper: 'text-xs',
  },
  lg: {
    gap: 'gap-2',
    label: 'text-base',
    helper: 'text-sm',
  },
};

/**
 * FormField Component
 * 
 * @example
 * <FormField label="Email" required>
 *   <Input id="email" placeholder="you@example.com" />
 * </FormField>
 * 
 * @example
 * <FormField label="Password" error="Password is required">
 *   <Input id="password" type="password" />
 * </FormField>
 * 
 * @example
 * <FormField label="Bio" helper="Tell us about yourself" optional>
 *   <Textarea id="bio" rows={3} />
 * </FormField>
 */
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      id,
      label,
      error,
      helper,
      size = 'md',
      layout = 'vertical',
      required = false,
      optional = false,
      disabled = false,
      children,
      className,
      labelClassName,
      contentClassName,
      fullWidth = true,
    },
    ref
  ) => {
    const hasError = !!error;
    const fieldId = id || `field-${Math.random().toString(36).slice(2, 9)}`;
    const helperId = `${fieldId}-helper`;
    const errorId = `${fieldId}-error`;
    
    // Clone children to add id and aria attributes
    const enhancedChildren = React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<any>, {
          id: fieldId,
          'aria-describedby': helper ? helperId : hasError ? errorId : undefined,
          'aria-invalid': hasError,
          disabled: disabled || (children as React.ReactElement<any>).props?.disabled,
        })
      : children;
    
    const layoutClasses = layout === 'vertical' ? 'flex flex-col' : 'flex flex-row items-start gap-4';
    const gapClass = sizeClasses[size].gap;
    
    return (
      <div
        ref={ref}
        className={cn(
          layoutClasses,
          gapClass,
          fullWidth && 'w-full',
          className
        )}
      >
        {label && (
          <Label
            htmlFor={fieldId}
            size={size}
            required={required}
            optional={optional}
            error={hasError}
            disabled={disabled}
            className={cn(
              layout === 'horizontal' && 'min-w-[120px] pt-2',
              labelClassName
            )}
          >
            {label}
          </Label>
        )}
        
        <div className={cn('flex-1', contentClassName)}>
          {enhancedChildren}
          
          {helper && !hasError && (
            <p
              id={helperId}
              className={cn(
                'mt-1 text-white/40',
                sizeClasses[size].helper,
                disabled && 'opacity-50'
              )}
            >
              {helper}
            </p>
          )}
          
          {hasError && (
            <p
              id={errorId}
              className={cn(
                'mt-1 text-red-400',
                sizeClasses[size].helper
              )}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

FormField.displayName = 'FormField';