// =====================================================
// FILE: constants/generated/hestia-core/badge_rarity.ts
// GENERATED: 2026-04-14T20:18:57.630Z
// SOURCE: Constants.public.Enums.badge_rarity
// VALUES: 5 entries
// =====================================================

export const BADGE_RARITY = {
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
  MYTHIC: 'mythic',
} as const;

export type BadgeRarity = typeof BADGE_RARITY[keyof typeof BADGE_RARITY];
