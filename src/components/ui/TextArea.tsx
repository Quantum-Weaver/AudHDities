// src/components/ui/TextArea.tsx
'use client';

import { forwardRef, TextareaHTMLAttributes, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  // Base styles
  "w-full rounded-lg border bg-transparent px-4 py-2 text-white placeholder:text-white/40 transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed resize-y",
  {
    variants: {
      variant: {
        default: "border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20",
        error: "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
        success: "border-green-500/50 focus:border-green-500 focus:ring-green-500/20",
        ghost: "border-transparent bg-white/5 focus:bg-white/10 focus:ring-white/20",
      },
      textareaSize: {
        sm: "px-3 py-1.5 text-sm min-h-[60px]",
        md: "px-4 py-2 text-base min-h-[100px]",
        lg: "px-6 py-3 text-lg min-h-[150px]",
      },
      fullWidth: {
        true: "w-full",
      },
      resize: {
        none: "resize-none",
        both: "resize",
        horizontal: "resize-x",
        vertical: "resize-y",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "md",
      fullWidth: true,
      resize: "vertical",
    },
  }
);

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
  maxLength?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    className, 
    variant, 
    textareaSize, 
    fullWidth, 
    resize,
    label, 
    error, 
    helperText,
    showCount,
    maxLength,
    id,
    disabled,
    value,
    defaultValue,
    onChange,
    ...props 
  }, ref) => {
    // Use React's useId hook for stable IDs across server/client
    const reactId = useId();
    const inputId = id || reactId;
    const hasError = !!error || variant === 'error';
    
    // Calculate character count safely
    const currentLength = 
      typeof value === 'string' ? value.length : 
      typeof defaultValue === 'string' ? defaultValue.length : 
      0;
    
    return (
      <div className={cn("space-y-2", fullWidth && "w-full")}>
        {/* Label and character count */}
        <div className="flex justify-between items-center">
          {label && (
            <label 
              htmlFor={inputId}
              className="block text-sm font-medium text-white/80"
            >
              {label}
            </label>
          )}
          {showCount && maxLength && (
            <span className="text-xs text-white/40">
              {currentLength} / {maxLength}
            </span>
          )}
        </div>
        
        {/* Textarea element */}
        <textarea
          ref={ref}
          id={inputId}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          maxLength={maxLength}
          className={cn(
            textareaVariants({ 
              variant: hasError ? 'error' : variant, 
              textareaSize, 
              fullWidth, 
              resize,
              className 
            })
          )}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        
        {/* Error or helper text */}
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-400">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-sm text-white/40">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea, textareaVariants };