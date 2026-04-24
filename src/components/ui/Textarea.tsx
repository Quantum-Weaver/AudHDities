// src/components/ui/Textarea.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TEXTAREA COMPONENT                                     ║
// ║                    The canvas for multi-line text                         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { TextareaProps } from '@/types/components/ui/textarea.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  TEXTAREA_DEFAULT_ROWS,
  TEXTAREA_LABEL_BASE_CLASSES,
  TEXTAREA_LABEL_DEFAULT_CLASS,
  TEXTAREA_LABEL_ERROR_CLASS,
  TEXTAREA_REQUIRED_CLASS,
  TEXTAREA_REQUIRED_SYMBOL,
  TEXTAREA_OPTIONAL_CLASS,
  TEXTAREA_OPTIONAL_TEXT,
  TEXTAREA_HELPER_CLASS,
  TEXTAREA_ERROR_CLASS,
  TEXTAREA_WRAPPER_BASE_CLASSES,
} from '@/lib/constants/components/ui/textarea.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import { textareaVariants } from '@/lib/constants/components/ui/textarea.variants';

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Textarea — Multi-line text input with label, helper, and error states.
 *
 * @example
 * <Textarea label="Message" placeholder="Your message..." rows={4} />
 *
 * @example
 * <Textarea label="Bio" error="Bio is required" />
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helper,
      size = 'md',
      rows = TEXTAREA_DEFAULT_ROWS,
      required = false,
      optional = false,
      fullWidth = true,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;

    return (
      <div
        className={cn(
          ...TEXTAREA_WRAPPER_BASE_CLASSES,
          fullWidth && 'w-full'
        )}
      >
        {/* ── Label ───────────────────────────────────────────────── */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              ...TEXTAREA_LABEL_BASE_CLASSES,
              hasError
                ? TEXTAREA_LABEL_ERROR_CLASS
                : TEXTAREA_LABEL_DEFAULT_CLASS
            )}
          >
            {label}
            {required && (
              <span className={cn('ml-1', TEXTAREA_REQUIRED_CLASS)}>
                {TEXTAREA_REQUIRED_SYMBOL}
              </span>
            )}
            {optional && (
              <span className={cn('ml-1', TEXTAREA_OPTIONAL_CLASS)}>
                {TEXTAREA_OPTIONAL_TEXT}
              </span>
            )}
          </label>
        )}

        {/* ── Textarea ────────────────────────────────────────────── */}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            textareaVariants({
              variant: hasError ? 'error' : 'default',
              size,
            }),
            fullWidth && 'w-full',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            helper
              ? `${textareaId}-helper`
              : hasError
                ? `${textareaId}-error`
                : undefined
          }
          disabled={disabled}
          {...props}
        />

        {/* ── Helper text ─────────────────────────────────────────── */}
        {helper && !hasError && (
          <p id={`${textareaId}-helper`} className={TEXTAREA_HELPER_CLASS}>
            {helper}
          </p>
        )}

        {/* ── Error text ──────────────────────────────────────────── */}
        {hasError && (
          <p id={`${textareaId}-error`} className={TEXTAREA_ERROR_CLASS}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';