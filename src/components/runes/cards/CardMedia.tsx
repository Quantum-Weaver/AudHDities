// src/components/runes/cards/CardMedia.tsx
'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { CardMediaProps } from '@/types/components/runes/card.types';

export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ src, alt, fallbackIcon, className, ...props }, ref) => {
    if (!src && !fallbackIcon) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-[var(--color-surface)]/20",
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Card image"}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : fallbackIcon ? (
          <div className="flex h-full w-full items-center justify-center text-4xl">
            {fallbackIcon}
          </div>
        ) : null}
      </div>
    );
  }
);

CardMedia.displayName = "CardMedia";