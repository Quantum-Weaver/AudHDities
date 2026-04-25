// src/components/ui/Input.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    INPUT COMPONENT                                        ║
// ║                    The gateway for text entry                             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { InputProps } from '@/types/components/ui/input.types';

// ─── Variants ──────────────────────────────────────────────────────────────
import { inputVariants } from '@/lib/constants/components/ui/input.variants';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  INPUT_WRAPPER_CLASSES,
  INPUT_FULL_WIDTH_CLASS,
  INPUT_LABEL_CLASSES,
  INPUT_LABEL_ERROR_CLASSES,
  INPUT_HELPER_CLASSES,
  INPUT_ERROR_CLASSES,
  INPUT_REQUIRED_INDICATOR,
  INPUT_OPTIONAL_INDICATOR,
  INPUT_CONTAINER_CLASSES,
  INPUT_ICON_CONTAINER_CLASSES,
} from '@/lib/constants/components/ui/input.constants';

/**
 * Input — Single-line text entry with label, icons, and validation states.
 *
 * @example
 * <Input label="Email" placeholder="you@example.com" />
 *
 * @example
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password is required"
 * />
 *
 * @example
 * <Input
 *   leftIcon={<MailIcon />}
 *   placeholder="Email"
 *   variant="filled"
 * />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      inputSize = 'md',
      variant = 'default',
      required = false,
      optional = false,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId =
      id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;

    // Determine icon modifier for variant classes
    const iconModifier = leftIcon && rightIcon
      ? 'both'
      : leftIcon
        ? 'left'
        : rightIcon
          ? 'right'
          : undefined;

    return (
      <div
        className={cn(
          INPUT_WRAPPER_CLASSES,
          fullWidth && INPUT_FULL_WIDTH_CLASS
        )}
      >
        {/* ── Label ────────────────────────────────────────────── */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              INPUT_LABEL_CLASSES,
              hasError && INPUT_LABEL_ERROR_CLASSES
            )}
          >
            {label}
            {required && (
              <span className={INPUT_REQUIRED_INDICATOR}>*</span>
            )}
            {optional && (
              <span className={INPUT_OPTIONAL_INDICATOR}>(optional)</span>
            )}
          </label>
        )}

        {/* ── Input Container ──────────────────────────────────── */}
        <div className={INPUT_CONTAINER_CLASSES}>
          {/* Left Icon */}
          {leftIcon && (
            <div className={cn(INPUT_ICON_CONTAINER_CLASSES, 'left-3')}>
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({
                variant: hasError ? 'error' : variant,
                size: inputSize,
                withIcon: iconModifier,
              }),
              fullWidth && INPUT_FULL_WIDTH_CLASS,
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              helper
                ? `${inputId}-helper`
                : hasError
                  ? `${inputId}-error`
                  : undefined
            }
            disabled={disabled}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className={cn(INPUT_ICON_CONTAINER_CLASSES, 'right-3')}>
              {rightIcon}
            </div>
          )}
        </div>

        {/* ── Helper Text ──────────────────────────────────────── */}
        {helper && !hasError && (
          <p id={`${inputId}-helper`} className={INPUT_HELPER_CLASSES}>
            {helper}
          </p>
        )}

        {/* ── Error Text ───────────────────────────────────────── */}
        {hasError && (
          <p id={`${inputId}-error`} className={INPUT_ERROR_CLASSES}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Re-export types for convenience
export type {
  InputProps,
  InputVariant,
  InputSize,
} from '@/types/components/ui/input.types';