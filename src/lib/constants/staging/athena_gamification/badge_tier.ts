// =====================================================
// FILE: constants/badge_tier.ts
// GENERATED: 2026-04-05T19:46:33.238Z
// SOURCE: Constants.public.Enums.badge_tier
// =====================================================

export const BADGE_TIER = {
  INITIATE: 'initiate',
  ADEPT: 'adept',
  MASTER: 'master',
} as const;

export type BadgeTier = typeof BADGE_TIER[keyof typeof BADGE_TIER];
