// =====================================================
// FILE: constants/badge_rarity.ts
// GENERATED: 2026-04-05T21:48:03.584Z
// SOURCE: Constants.public.Enums.badge_rarity
// =====================================================

export const BADGE_RARITY = {
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
  MYTHIC: 'mythic',
} as const;

export type BadgeRarity = typeof BADGE_RARITY[keyof typeof BADGE_RARITY];
