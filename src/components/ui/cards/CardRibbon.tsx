'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES (moved from Card.tsx)
// ============================================================================

export type RibbonPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type RibbonColor = 'fire' | 'quantum' | 'cosmic' | 'hearth' | 'success' | 'warning' | 'error' | 'neurospark' | 'sanctuary';

export interface CardRibbonProps {
  /** Text displayed inside the ribbon */
  text: string;
  /** Corner position */
  position?: RibbonPosition;
  /** Color scheme derived from COSMIC tokens */
  color?: RibbonColor;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// CONSTANTS (derived from COSMIC tokens)
// ============================================================================

const ribbonColorMap: Record<RibbonColor, { bg: string; text: string; shadow: string }> = {
  fire: {
    bg: 'bg-[var(--color-fire-base)]',
    text: 'text-white',
    shadow: 'shadow-[var(--color-fire-base)]/30',
  },
  quantum: {
    bg: 'bg-[var(--color-quantum-purple)]',
    text: 'text-white',
    shadow: 'shadow-[var(--color-quantum-purple)]/30',
  },
  cosmic: {
    bg: 'bg-[var(--color-cosmic-blue)]',
    text: 'text-white',
    shadow: 'shadow-[var(--color-cosmic-blue)]/30',
  },
  hearth: {
    bg: 'bg-[var(--color-hearth-gold)]',
    text: 'text-[var(--color-deepSpace)]',
    shadow: 'shadow-[var(--color-hearth-gold)]/30',
  },
  success: {
    bg: 'bg-[var(--color-success)]',
    text: 'text-white',
    shadow: 'shadow-[var(--color-success)]/30',
  },
  warning: {
    bg: 'bg-[var(--color-warning)]',
    text: 'text-[var(--color-deepSpace)]',
    shadow: 'shadow-[var(--color-warning)]/30',
  },
  error: {
    bg: 'bg-[var(--color-error)]',
    text: 'text-white',
    shadow: 'shadow-[var(--color-error)]/30',
  },
  neurospark: {
    bg: 'bg-[var(--color-neurospark)]',
    text: 'text-[var(--color-deepSpace)]',
    shadow: 'shadow-[var(--color-neurospark)]/30',
  },
  sanctuary: {
    bg: 'bg-[var(--color-sanctuary-green)]',
    text: 'text-white',
    shadow: 'shadow-[var(--color-sanctuary-green)]/30',
  },
};

const ribbonPositionClasses: Record<RibbonPosition, string> = {
  'top-right': '-rotate-45 translate-x-[42%] -translate-y-[10%] right-0 top-0 origin-top-left',
  'top-left': 'rotate-45 -translate-x-[42%] -translate-y-[10%] left-0 top-0 origin-top-right',
  'bottom-right': 'rotate-45 translate-x-[42%] translate-y-[10%] right-0 bottom-0 origin-bottom-left',
  'bottom-left': '-rotate-45 -translate-x-[42%] translate-y-[10%] left-0 bottom-0 origin-bottom-right',
};

const ribbonWidthClasses: Record<RibbonPosition, string> = {
  'top-right': 'w-32',
  'top-left': 'w-32',
  'bottom-right': 'w-32',
  'bottom-left': 'w-32',
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * CardRibbon — Corner ribbon overlay for cards
 * 
 * Renders a diagonal banner across a card corner. The parent Card must have
 * `overflow-hidden` (already set by cardVariants base classes).
 * 
 * @example
 * <Card data={data} variant="glass" radius="lg" shadow="md">
 *   <CardRibbon text="LIVE" position="top-right" color="fire" />
 *   <CardHeader title={data.title} />
 * </Card>
 */
export const CardRibbon: React.FC<CardRibbonProps> = ({
  text,
  position = 'top-right',
  color = 'quantum',
  className,
}) => {
  const colorClasses = ribbonColorMap[color];

  return (
    <div
      className={cn(
        'absolute z-10 flex items-center justify-center py-1 px-8',
        'text-xs font-bold uppercase tracking-wider',
        'shadow-lg',
        ribbonPositionClasses[position],
        ribbonWidthClasses[position],
        colorClasses.bg,
        colorClasses.text,
        colorClasses.shadow,
        className
      )}
      aria-label={text}
      role="status"
    >
      {text}
    </div>
  );
};

CardRibbon.displayName = 'CardRibbon';