// src/components/ui/cards/CardFooter.tsx
'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { CardFooterProps } from '@/types/components/ui/card.types';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ actions, className, ...props }, ref) => {
    if (!actions || actions.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-2", className)}
        {...props}
      >
        {actions.map((action, index) => (
          <div key={index}>{action}</div>
        ))}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";