'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { getTierBadgeColor } from '@/lib/utils/components/ui/card.utils';

// ============================================================================
// TYPES
// ============================================================================

export type TierLevel = 'community' | 'ally' | 'corporate' | 'council';

export interface TierBadgeProps {
  tier: TierLevel;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const tierLabels: Record<TierLevel, string> = {
  community: 'Community',
  ally: 'Ally',
  corporate: 'Corporate',
  council: 'Council',
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * TierBadge — Color-coded membership tier indicator.
 * Colors are derived from COSMIC tokens via getTierBadgeColor().
 */
export const TierBadge: React.FC<TierBadgeProps> = ({ tier }) => {
  const colorClass = getTierBadgeColor(tier);
  
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", colorClass)}>
      {tierLabels[tier]}
    </span>
  );
};

TierBadge.displayName = 'TierBadge';