'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/yggdrasil/Label';
import { FIELD_SIZE_LABEL_MAP, FIELD_WRAPPER_LAYOUT } from '@/lib/constants/components/ui/field_wrapper.constants';
import type { FieldWrapperSize } from '@/lib/constants/components/ui/field_wrapper.constants';

// ============================================================================
// TYPES
// ============================================================================

export type { FieldWrapperSize };

export interface FieldWrapperProps {
  /** Unique ID for the field */
  id: string;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text (shown only when no error) */
  helper?: string;
  /** Size of the field */
  size?: FieldWrapperSize;
  /** Show required indicator */
  required?: boolean;
  /** Show optional indicator */
  optional?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** The input/control element */
  children: React.ReactNode;
  /** Additional className for the outer container */
  className?: string;
  /** Full width */
  fullWidth?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * FieldWrapper — Shared label + helper/error wrapper for form controls.
 * All values derived from COSMIC system via field-wrapper.constants.
 */
export const FieldWrapper = React.forwardRef<HTMLDivElement, FieldWrapperProps>(
  (
    {
      id,
      label,
      error,
      helper,
      size = 'md',
      required = false,
      optional = false,
      disabled = false,
      children,
      className,
      fullWidth = true,
    },
    ref
  ) => {
    const hasError = !!error;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const describedBy = helper && !hasError ? helperId : hasError ? errorId : undefined;

    // Clone children to inject aria attributes
    const enhancedChildren = React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<any>, {
          'aria-describedby': describedBy,
          'aria-invalid': hasError || undefined,
        })
      : children;

    const { labelSize, helperSize } = FIELD_SIZE_LABEL_MAP[size];

    return (
      <div
        ref={ref}
        className={cn(
          FIELD_WRAPPER_LAYOUT.container,
          fullWidth && FIELD_WRAPPER_LAYOUT.fullWidth,
          className
        )}
      >
        {label && (
          <Label
            htmlFor={id}
            size={labelSize}
            required={required}
            optional={optional}
            error={hasError}
            disabled={disabled}
          >
            {label}
          </Label>
        )}

        {enhancedChildren}

        {helper && !hasError && (
          <p
            id={helperId}
            className={cn(
              FIELD_WRAPPER_LAYOUT.helperText,
              helperSize,
              disabled && FIELD_WRAPPER_LAYOUT.disabled
            )}
          >
            {helper}
          </p>
        )}

        {hasError && (
          <p
            id={errorId}
            className={cn(
              FIELD_WRAPPER_LAYOUT.errorText,
              helperSize
            )}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FieldWrapper.displayName = 'FieldWrapper';