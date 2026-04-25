'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useFormValidation } from '@/components/forging/FormValidation';
import { AlertCircle } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface ValidationSummaryProps {
  title?: string;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const ValidationSummary = React.forwardRef<HTMLDivElement, ValidationSummaryProps>(
  ({ title = 'Please correct the following errors:', className }, ref) => {
    const { errors, touched } = useFormValidation();
    const visibleErrors = Object.entries(errors).filter(([field]) => touched[field]);

    if (visibleErrors.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'mb-6 p-4 rounded-lg bg-[var(--color-error)]/10 border border-[var(--color-error)]/30',
          className
        )}
        role="alert"
      >
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-[var(--color-error)] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[var(--color-error)]">{title}</p>
            <ul className="mt-2 space-y-1">
              {visibleErrors.map(([field, message]) => (
                <li key={field} className="text-xs text-[var(--color-error)]">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
);

ValidationSummary.displayName = 'ValidationSummary';