// src/components/runes/badges/PriceBadge.tsx
'use client';

import React from 'react';
import { formatPrice, getLowestPrice, getPriceRange } from '@/lib/utils/components/runes/card.utils';

// ============================================================================
// TYPES
// ============================================================================

export interface PriceBadgeProps {
  data: {
    price?: number;
    priceCommunity?: number;
    priceAlly?: number;
    priceCorporate?: number;
  };
  /** Show only the lowest available price instead of the range */
  showLowest?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * PriceBadge — Displays formatted price information for product cards.
 * Shows either the lowest available price or the full price range.
 * All styling uses COSMIC tokens.
 */
export const PriceBadge: React.FC<PriceBadgeProps> = ({ data, showLowest = false }) => {
  const lowestPrice = getLowestPrice(data as any);
  const priceRange = getPriceRange(data as any);
  const displayText = showLowest && lowestPrice ? formatPrice(lowestPrice) : priceRange;
  
  if (!displayText) return null;
  
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--color-quantum-purple)]/20 px-2 py-0.5 text-xs font-medium text-[var(--color-quantum-purple)]">
      {displayText}
    </span>
  );
};

PriceBadge.displayName = 'PriceBadge';