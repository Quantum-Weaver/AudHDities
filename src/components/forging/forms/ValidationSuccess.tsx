// components/forging/forms/ValidationSuccess.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useFormValidation } from '@/components/forging/FormValidation';
import { CheckCircle } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface ValidationSuccessProps {
  message: string;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const ValidationSuccess = React.forwardRef<HTMLDivElement, ValidationSuccessProps>(
  ({ message, className }, ref) => {
    const { isValid } = useFormValidation();

    if (!isValid) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'mb-6 p-4 rounded-lg bg-[var(--color-success)]/10 border border-[var(--color-success)]/30',
          className
        )}
        role="status"
      >
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--color-success)]">{message}</p>
        </div>
      </div>
    );
  }
);

ValidationSuccess.displayName = 'ValidationSuccess';