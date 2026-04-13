// =====================================================
// FILE: constants/athena-gamification/badge_tier.ts
// GENERATED: 2026-04-13T01:15:57.345Z
// SOURCE: Constants.public.Enums.badge_tier
// VALUES: 3 entries
// =====================================================

export const BADGE_TIER = {
  INITIATE: 'initiate',
  ADEPT: 'adept',
  MASTER: 'master',
} as const;

export type BadgeTier = typeof BADGE_TIER[keyof typeof BADGE_TIER];
