// src/components/ui/cards/CardContent.tsx
'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { CardContentProps } from '@/types/components/ui/card.types';

export const CardContent = forwardRef<HTMLDivElement, CardContentProps & { children?: React.ReactNode }>(
  ({ description, metadata, children, className, ...props }, ref) => {
    if (!description && (!metadata || metadata.length === 0) && !children) return null;

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {description && (
          <p className="text-sm text-[var(--color-star-dust)]/80 line-clamp-3">
            {description}
          </p>
        )}
        {children}
        {metadata && metadata.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            {metadata.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className="text-[var(--color-star-dust)]/50">{item.label}:</span>
                <span className="font-medium text-[var(--color-star-dust)]/80">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";