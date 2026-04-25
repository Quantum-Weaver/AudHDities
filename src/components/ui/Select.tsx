// src/components/ui/Select.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SELECT COMPONENT                                        ║
// ║                    The choice gateway                                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  SelectProps,
  SelectOption,
} from '@/types/components/ui/select.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  SELECT_CHEVRON_COLOR,
  SELECT_CHEVRON_SIZE,
  SELECT_HELPER_COLOR,
  SELECT_ERROR_TEXT_COLOR,
  SELECT_GAP,
  SELECT_OPTION_BG,
  SELECT_TEXT_COLOR,
  SELECT_PLACEHOLDER_COLOR,
  SELECT_REQUIRED_STAR_COLOR,
  SELECT_OPTIONAL_TEXT_COLOR,
} from '@/lib/constants/components/ui/select.constants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  composeSelectTriggerClasses,
  composeSelectLabelClasses,
} from '@/lib/utils/components/ui/select.utils';

// ═══════════════════════════════════════════════════════════════════════════
// SELECT
// ═══════════════════════════════════════════════════════════════════════════

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helper,
      selectSize = 'md',
      options,
      placeholder,
      required = false,
      optional = false,
      fullWidth = true,
      variant = 'default',
      native = false,
      className,
      id,
      disabled,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || `select-${generatedId}`;
    const hasError = !!error;

    const triggerClasses = composeSelectTriggerClasses({
      variant,
      size: selectSize,
      native,
      fullWidth,
      hasError,
      className,
    });

    const labelClasses = composeSelectLabelClasses(hasError);

    return (
      <div className={cn('flex flex-col', SELECT_GAP, fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={selectId} className={labelClasses}>
            {label}
            {required && (
              <span className={cn('ml-1', SELECT_REQUIRED_STAR_COLOR)}>*</span>
            )}
            {optional && (
              <span className={cn('ml-1 text-xs', SELECT_OPTIONAL_TEXT_COLOR)}>
                (optional)
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={triggerClasses}
            aria-invalid={hasError}
            aria-describedby={
              helper && !hasError
                ? `${selectId}-helper`
                : hasError
                  ? `${selectId}-error`
                  : undefined
            }
            disabled={disabled}
            defaultValue={defaultValue || (placeholder ? '' : undefined)}
            {...props}
          >
            {placeholder && (
              <option
                value=""
                disabled
                className={cn(SELECT_PLACEHOLDER_COLOR, SELECT_OPTION_BG)}
              >
                {placeholder}
              </option>
            )}
            {options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={cn(SELECT_OPTION_BG, SELECT_TEXT_COLOR)}
              >
                {option.label}
              </option>
            ))}
          </select>

          {!native && (
            <ChevronDown
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none',
                SELECT_CHEVRON_COLOR,
                SELECT_CHEVRON_SIZE
              )}
            />
          )}
        </div>

        {helper && !hasError && (
          <p id={`${selectId}-helper`} className={cn('text-xs', SELECT_HELPER_COLOR)}>
            {helper}
          </p>
        )}

        {hasError && (
          <p id={`${selectId}-error`} className={cn('text-xs', SELECT_ERROR_TEXT_COLOR)}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// ═══════════════════════════════════════════════════════════════════════════
// RE-EXPORT TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type {
  SelectProps,
  SelectOption,
  SelectSize,
  SelectVariant,
  SelectSizeVariant,
} from '@/types/components/ui/select.types';