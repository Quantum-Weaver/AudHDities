// components/forging/Checkbox.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CHECKBOX COMPONENT                                     ║
// ║                    The binary choice gateway                              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  CheckboxProps,
  CheckboxGroupProps,
} from '@/types/components/forging/checkbox.types';

// ─── Utilities ─────────────────────────────────────────────────────────────────
import {
  toggleCheckboxValue,
} from '@/lib/utils/components/forging/checkbox.utils';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  CHECKBOX_SIZE,
  CHECK_ICON_SIZE,
  CHECKBOX_LABEL_SIZE,
  CHECKBOX_SPACING,
  CHECKBOX_TEXT_OPACITY,
  CHECKBOX_ERROR,
} from '@/lib/constants/components/forging/checkbox.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import { checkboxVariants } from '@/lib/constants/components/forging/checkbox.variants';

// ═══════════════════════════════════════════════════════════════════════════
// CHECKBOX
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Checkbox — A binary choice input with label, helper text, and error state.
 *
 * @example
 * <Checkbox label="I agree to the terms" />
 *
 * @example
 * <Checkbox
 *   label="Subscribe to newsletter"
 *   variant="card"
 *   size="lg"
 *   defaultChecked
 * />
 *
 * @example
 * <Checkbox
 *   label="Accept"
 *   error="This field is required"
 * />
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helper,
      variant = 'default',
      size = 'md',
      className,
      id: externalId,
      disabled,
      checked,
      defaultChecked,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = externalId || `checkbox-${generatedId}`;
    const hasError = !!error;
    const isChecked = checked ?? defaultChecked;

    return (
      <div className="flex flex-col gap-1">
        <div className={cn('flex items-start', CHECKBOX_SPACING.GAP)}>
          {/* ── Checkbox Input + Custom Check Icon ── */}
          <div className="relative flex items-center justify-center mt-0.5 shrink-0">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              className={cn(
                checkboxVariants({ variant, size }),
                hasError && CHECKBOX_ERROR.BORDER,
                className
              )}
              checked={checked}
              defaultChecked={defaultChecked}
              aria-invalid={hasError}
              aria-describedby={
                helper && !hasError
                  ? `${checkboxId}-helper`
                  : hasError
                    ? `${checkboxId}-error`
                    : undefined
              }
              disabled={disabled}
              {...props}
            />
            <Check
              className={cn(
                'absolute pointer-events-none text-white transition-opacity',
                CHECK_ICON_SIZE[size],
                isChecked ? 'opacity-100' : 'opacity-0'
              )}
              aria-hidden="true"
            />
          </div>

          {/* ── Label ── */}
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'cursor-pointer select-none',
                CHECKBOX_LABEL_SIZE[size],
                CHECKBOX_TEXT_OPACITY.LABEL,
                disabled && CHECKBOX_TEXT_OPACITY.DISABLED,
                hasError && CHECKBOX_ERROR.TEXT
              )}
            >
              {label}
            </label>
          )}
        </div>

        {/* ── Helper Text ── */}
        {helper && !hasError && (
          <p
            id={`${checkboxId}-helper`}
            className={cn(
              'text-xs',
              CHECKBOX_TEXT_OPACITY.HELPER,
              CHECKBOX_SPACING.HELPER_INDENT
            )}
          >
            {helper}
          </p>
        )}

        {/* ── Error Text ── */}
        {hasError && (
          <p
            id={`${checkboxId}-error`}
            className={cn(
              'text-xs',
              CHECKBOX_ERROR.TEXT,
              CHECKBOX_SPACING.HELPER_INDENT
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

Checkbox.displayName = 'Checkbox';

// ═══════════════════════════════════════════════════════════════════════════
// CHECKBOX GROUP
// ═══════════════════════════════════════════════════════════════════════════

/**
 * CheckboxGroup — A group of related checkboxes with shared state management.
 *
 * @example
 * <CheckboxGroup
 *   options={[
 *     { value: 'quantum', label: 'Quantum' },
 *     { value: 'cosmic', label: 'Cosmic' },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 */
function CheckboxGroup({
  options,
  value = [],
  onChange,
  variant,
  size = 'md',
  error,
  orientation = 'vertical',
  className,
}: CheckboxGroupProps) {
  return (
    <div
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row flex-wrap gap-4',
        className
      )}
      role="group"
    >
      {options.map((option) => (
        <Checkbox
          key={option.value}
          label={option.label}
          helper={option.helper}
          disabled={option.disabled}
          variant={variant}
          size={size}
          checked={value.includes(option.value)}
          onChange={() => {
            const result = toggleCheckboxValue(value, option.value);
            onChange?.(result.newValues);
          }}
        />
      ))}
      {error && (
        <p className={cn('text-xs', CHECKBOX_ERROR.TEXT)} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

CheckboxGroup.displayName = 'CheckboxGroup';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export { CheckboxGroup };
export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxVariant,
  CheckboxSizeVariant,
  CheckboxSize,
} from '@/types/components/forging/checkbox.types';