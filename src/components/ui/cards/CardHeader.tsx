// src/components/ui/cards/CardHeader.tsx
'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { CardHeaderProps } from '@/types/components/runes/card.types';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, badge, actions, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-[var(--color-star-dust)] line-clamp-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-[var(--color-star-dust)]/60 line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
          {badge && <div className="flex-shrink-0">{badge}</div>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";