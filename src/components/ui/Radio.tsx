// src/components/ui/Radio.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    RADIO COMPONENT                                        ║
// ║                    Sovereign selection control                            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  RadioGroupProps,
  RadioProps,
  RadioGroupContextValue,
} from '@/types/components/forging/radio.types';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  radioControlVariants,
  radioIndicatorVariants,
  radioLabelVariants,
  radioGroupVariants,
} from '@/lib/constants/components/ui/radio.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  generateRadioId,
  getRadioDescriptionId,
} from '@/lib/utils/components/forging/radio.utils';

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════════════════

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup(): RadioGroupContextValue {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('Radio components must be used within a RadioGroup');
  }
  return context;
}

// ═══════════════════════════════════════════════════════════════════════════
// RADIO GROUP
// ═══════════════════════════════════════════════════════════════════════════

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value,
      onChange,
      size = 'MD',
      variant = 'default',
      direction = 'vertical',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const contextValue: RadioGroupContextValue = {
      name,
      value,
      onChange,
      size,
      variant,
    };

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-slot="radio-group"
          className={cn(radioGroupVariants({ direction }), className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

// ═══════════════════════════════════════════════════════════════════════════
// RADIO
// ═══════════════════════════════════════════════════════════════════════════

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      label,
      error,
      helper,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const { name, value: groupValue, onChange, size, variant } = useRadioGroup();
    const radioId = generateRadioId(id);
    const isChecked = groupValue === value;
    const hasError = !!error;
    const hasHelper = !!helper && !hasError;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          {/* ── Control (hidden native input + visual indicator) ── */}
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="radio"
              name={name}
              value={value}
              id={radioId}
              checked={isChecked}
              onChange={(e) => onChange(e.target.value)}
              className={cn(
                radioControlVariants({ variant, size }),
                hasError && 'border-error checked:border-error',
                className
              )}
              aria-invalid={hasError || undefined}
              aria-describedby={getRadioDescriptionId(radioId, hasError, hasHelper)}
              disabled={disabled}
              {...props}
            />
            <div
              data-slot="radio-indicator"
              className={cn(
                radioIndicatorVariants({
                  size,
                  checked: isChecked,
                })
              )}
            />
          </div>

          {/* ── Label ── */}
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                radioLabelVariants({ size, disabled: !!disabled }),
                hasError && 'text-error'
              )}
            >
              {label}
            </label>
          )}
        </div>

        {/* ── Helper Text ── */}
        {hasHelper && (
          <p
            id={`${radioId}-helper`}
            className="text-xs text-star-dust/40 pl-6"
          >
            {helper}
          </p>
        )}

        {/* ── Error Message ── */}
        {hasError && (
          <p
            id={`${radioId}-error`}
            className="text-xs text-error pl-6"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
Radio.displayName = 'Radio';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  RadioGroupProps,
  RadioProps,
  RadioVariant,
  RadioSize,
  RadioGroupDirection,
} from '@/types/components/forging/radio.types';