// src/utils/components/runes/badge.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    BADGE UTILITIES                                        ║
// ║                    Color resolvers and helpers for specialized badges     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  DifficultyLevel,
  StatusType,
  TierLevel,
} from '@/types/components/runes/badge.types';
import {
  QUANTUM_COLORS,
  STATUS_COLORS,
  MOOD_COLORS,
} from '@/lib/constants/cosmic/index';

// ─── Difficulty Color Map ──────────────────────────────────────────────────
const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  beginner: `bg-[${MOOD_COLORS.calm}]/20 text-[${MOOD_COLORS.calm}]`,
  intermediate: `bg-[${STATUS_COLORS.inDevelopment}]/20 text-[${STATUS_COLORS.inDevelopment}]`,
  advanced: `bg-[${QUANTUM_COLORS['fire.base']}]/20 text-[${QUANTUM_COLORS['fire.base']}]`,
  master: `bg-[${QUANTUM_COLORS['quantum.purple']}]/20 text-[${QUANTUM_COLORS['quantum.purple']}]`,
};

/** Get the color class string for a difficulty level */
export function getDifficultyColor(difficulty: DifficultyLevel): string {
  return DIFFICULTY_COLORS[difficulty];
}

// ─── Status Color Map ──────────────────────────────────────────────────────
const STATUS_COLOR_MAP: Record<StatusType, string> = {
  active: `bg-[${STATUS_COLORS.quantumActive}]/20 text-[${STATUS_COLORS.quantumActive}]`,
  passed: `bg-[${STATUS_COLORS.complete}]/20 text-[${STATUS_COLORS.complete}]`,
  failed: `bg-[${STATUS_COLORS.critical}]/20 text-[${STATUS_COLORS.critical}]`,
  pending: `bg-[${STATUS_COLORS.planned}]/20 text-[${STATUS_COLORS.planned}]`,
  completed: `bg-[${STATUS_COLORS.complete}]/20 text-[${STATUS_COLORS.complete}]`,
  current: `bg-[${STATUS_COLORS.foundationLaid}]/20 text-[${STATUS_COLORS.foundationLaid}]`,
};

/** Get the color class string for a proposal status */
export function getProposalStatusColor(status: StatusType): string {
  return STATUS_COLOR_MAP[status] || STATUS_COLOR_MAP.pending;
}

// ─── Tier Color Map ────────────────────────────────────────────────────────
const TIER_COLOR_MAP: Record<TierLevel, string> = {
  community: `bg-[${MOOD_COLORS.peaceful}]/20 text-[${MOOD_COLORS.peaceful}]`,
  ally: `bg-[${MOOD_COLORS.creative}]/20 text-[${MOOD_COLORS.creative}]`,
  corporate: `bg-[${STATUS_COLORS.inDevelopment}]/20 text-[${STATUS_COLORS.inDevelopment}]`,
  council: `bg-[${QUANTUM_COLORS['quantum.purple']}]/20 text-[${QUANTUM_COLORS['quantum.purple']}]`,
};

/** Get the color class string for a membership tier */
export function getTierBadgeColor(tier: TierLevel): string {
  return TIER_COLOR_MAP[tier] || TIER_COLOR_MAP.community;
}

// ─── Price Formatting (used by PriceBadge) ─────────────────────────────────
interface PriceData {
  price?: number;
  priceCommunity?: number;
  priceAlly?: number;
  priceCorporate?: number;
}

/** Format a price number as USD currency string */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/** Get the lowest available price from tiered pricing */
export function getLowestPrice(data: PriceData): number | null {
  const prices = [
    data.price,
    data.priceCommunity,
    data.priceAlly,
    data.priceCorporate,
  ].filter((p): p is number => typeof p === 'number' && p > 0);

  if (prices.length === 0) return null;
  return Math.min(...prices);
}

/** Get a display string showing the price range or lowest price */
export function getPriceRange(data: PriceData): string {
  const lowest = getLowestPrice(data);
  if (!lowest) return '';
  return formatPrice(lowest);
}