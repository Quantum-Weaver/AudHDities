// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    BADGE TYPES                                            ║
// ║                    All type definitions for the Badge component           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  BadgeVariant,
  BadgeSizeKey ,
} from '@/lib/constants/components/ui/badge.variants';
import type {
  BadgeGroupSpacing,
} from '@/lib/constants/components/ui/badge.constants';
// ─── Re-exports from constants/variants ────────────────────────────────────
export type { BadgeVariant, BadgeSizeKey, BadgeGroupSpacing };

// ─── Badge Props ───────────────────────────────────────────────────────────
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant — determines color and border */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSizeKey;
  /** Make badge fully rounded (pill shape) */
  pill?: boolean;
  /** Show a colored dot indicator before the content */
  dot?: boolean;
  /** Show a remove button */
  removable?: boolean;
  /** Callback when remove button is clicked */
  onRemove?: () => void;
}

// ─── Badge Group Props ─────────────────────────────────────────────────────
export interface BadgeGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between badges */
  spacing?: BadgeGroupSpacing;
}

// ─── Specialized Badge Types ───────────────────────────────────────────────
export type DifficultyLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'master';

export interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
}

export interface PriceBadgeProps {
  data: {
    price?: number;
    priceCommunity?: number;
    priceAlly?: number;
    priceCorporate?: number;
  };
  /** Show only the lowest available price instead of range */
  showLowest?: boolean;
}

export type StatusType =
  | 'active'
  | 'passed'
  | 'failed'
  | 'pending'
  | 'completed'
  | 'current';

export interface StatusBadgeProps {
  status: StatusType;
}

export type TierLevel = 'community' | 'ally' | 'corporate' | 'council';

export interface TierBadgeProps {
  tier: TierLevel;
}