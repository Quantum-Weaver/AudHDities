// src/components/ui/FormField.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM FIELD COMPONENT                                   ║
// ║                    The consistent form field unit                           ║
// ║                    All values from COSMIC constants                        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './Label';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  FormFieldProps,
} from '@/types/components/forging/form_field.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  FORM_FIELD_LAYOUT_VERTICAL,
  FORM_FIELD_LAYOUT_HORIZONTAL,
  FORM_FIELD_FULL_WIDTH,
  FORM_FIELD_SIZE_CONFIG,
  FORM_FIELD_HORIZONTAL_LABEL_MIN_WIDTH,
  FORM_FIELD_HORIZONTAL_LABEL_PADDING_TOP,
  FORM_FIELD_CONTENT_FLEX,
  FORM_FIELD_HELPER_MARGIN_TOP,
  FORM_FIELD_HELPER_COLOR,
  FORM_FIELD_ERROR_MARGIN_TOP,
  FORM_FIELD_ERROR_COLOR,
} from '@/lib/constants/components/ui/form_field.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  formFieldHelperVariants,
  formFieldErrorVariants,
} from '@/lib/constants/components/ui/form_field.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  generateFieldId,
  getHelperId,
  getErrorId,
} from '@/lib/utils/components/forging/form_field.utils';

// ═══════════════════════════════════════════════════════════════════════════
// FORM FIELD
// ═══════════════════════════════════════════════════════════════════════════

/**
 * FormField — Consistent wrapper for label + input + error/helper messages.
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
    const fieldId = id || generateFieldId();
    const helperId = getHelperId(fieldId);
    const errorId = getErrorId(fieldId);

    const sizeConfig = FORM_FIELD_SIZE_CONFIG[size];

    const enhancedChildren = React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<any>, {
          id: fieldId,
          'aria-describedby': helper
            ? helperId
            : hasError
            ? errorId
            : undefined,
          'aria-invalid': hasError,
          disabled:
            disabled ||
            (children as React.ReactElement<any>).props?.disabled,
        })
      : children;

    const layoutClass =
      layout === 'vertical'
        ? FORM_FIELD_LAYOUT_VERTICAL
        : FORM_FIELD_LAYOUT_HORIZONTAL;

    const helperClass = formFieldHelperVariants({
      size,
      disabled,
    });

    const errorClass = formFieldErrorVariants({ size });

    return (
      <div
        ref={ref}
        className={cn(
          layoutClass,
          sizeConfig.gap,
          fullWidth && FORM_FIELD_FULL_WIDTH,
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
              layout === 'horizontal' && [
                FORM_FIELD_HORIZONTAL_LABEL_MIN_WIDTH,
                FORM_FIELD_HORIZONTAL_LABEL_PADDING_TOP,
              ],
              labelClassName
            )}
          >
            {label}
          </Label>
        )}

        <div className={cn(FORM_FIELD_CONTENT_FLEX, contentClassName)}>
          {enhancedChildren}

          {helper && !hasError && (
            <p
              id={helperId}
              className={cn(
                FORM_FIELD_HELPER_MARGIN_TOP,
                FORM_FIELD_HELPER_COLOR,
                helperClass
              )}
            >
              {helper}
            </p>
          )}

          {hasError && (
            <p
              id={errorId}
              className={cn(
                FORM_FIELD_ERROR_MARGIN_TOP,
                FORM_FIELD_ERROR_COLOR,
                errorClass
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

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  FormFieldProps,
  FormFieldSize,
  FormFieldLayout,
} from '@/types/components/forging/form_field.types';