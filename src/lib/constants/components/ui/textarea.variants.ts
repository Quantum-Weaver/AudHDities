// src/lib/constants/components/ui/textarea.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TEXTAREA VARIANTS                                      ║
// ║                    CVA variant definitions                                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

export const textareaVariants = cva(
  [
    'w-full',
    'rounded-lg',
    'border',
    'bg-transparent',
    'transition-all',
    'duration-200',
    'outline-none',
    'resize-vertical',
    'placeholder:text-star-dust/30',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'border-white/10',
          'bg-white/5',
          'focus:border-neurospark',
          'focus:ring-1',
          'focus:ring-neurospark/20',
        ].join(' '),
        error: [
          'border-error',
          'focus:border-error',
          'focus:ring-1',
          'focus:ring-error/20',
        ].join(' '),
        success: [
          'border-success',
          'focus:border-success',
          'focus:ring-1',
          'focus:ring-success/20',
        ].join(' '),
        filled: [
          'bg-white/10',
          'border-white/10',
          'focus:border-neurospark',
          'focus:ring-1',
          'focus:ring-neurospark/20',
        ].join(' '),
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        md: 'px-3 py-2 text-base',
        lg: 'px-4 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type TextareaVariant = NonNullable<
  Parameters<typeof textareaVariants>[0]
>['variant'];

export type TextareaSize = NonNullable<
  Parameters<typeof textareaVariants>[0]
>['size'];