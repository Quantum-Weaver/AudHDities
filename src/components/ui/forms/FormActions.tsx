'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FORM_SPACING, FORM_SIZES } from '@/lib/constants/components/ui/form.variants';
import type { FormSpacing } from '@/types/components/ui/form.types';

// ============================================================================
// TYPES
// ============================================================================

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right';
  spacing?: FormSpacing;
}

// ============================================================================
// CONSTANTS (derived from COSMIC tokens)
// ============================================================================

const alignClasses: Record<'left' | 'center' | 'right', string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const spacingClasses: Record<FormSpacing, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
};

// ============================================================================
// COMPONENT
// ============================================================================

export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ children, align = 'right', spacing = 'md', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          alignClasses[align],
          spacingClasses[spacing],
          'mt-4 pt-4 border-t border-[var(--color-star-dust)]/10',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormActions.displayName = 'FormActions';