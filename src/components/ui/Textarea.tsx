// components/ui/Textarea.tsx
// Textarea Component - The canvas for multi-line text
// Collects multi-line text input from users

import React from 'react';
import { cn } from '@/lib/utils';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
  /** Size of the textarea */
  size?: TextareaSize;
  /** Number of rows */
  rows?: number;
  /** Show required indicator */
  required?: boolean;
  /** Show optional indicator */
  optional?: boolean;
  /** Full width */
  fullWidth?: boolean;
}

const sizeClasses: Record<TextareaSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

/**
 * Textarea Component
 * 
 * @example
 * <Textarea label="Message" placeholder="Your message here..." rows={4} />
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
      rows = 3,
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
    const textareaId = id || `textarea-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;
    
    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'text-sm font-medium text-white/80',
              hasError && 'text-red-400'
            )}
          >
            {label}
            {required && <span className="ml-1 text-cyan-400">*</span>}
            {optional && <span className="ml-1 text-white/40 text-xs">(optional)</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'rounded-lg border transition-all duration-200',
            'bg-white/5 border-white/10',
            'placeholder:text-white/30',
            'focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'resize-vertical',
            sizeClasses[size],
            hasError && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            fullWidth && 'w-full',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            helper ? `${textareaId}-helper` : hasError ? `${textareaId}-error` : undefined
          }
          disabled={disabled}
          {...props}
        />
        
        {helper && !hasError && (
          <p id={`${textareaId}-helper`} className="text-xs text-white/40">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p id={`${textareaId}-error`} className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';