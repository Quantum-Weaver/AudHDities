// =====================================================
// FILE: constants/generated/hestia-core/sovereign_tier.ts
// GENERATED: 2026-07-18T23:17:11.314Z
// SOURCE: Constants.public.Enums.sovereign_tier
// VALUES: 4 entries
// =====================================================

export const SOVEREIGN_TIER = {
  DWELLER: 'dweller',
  GUILD: 'guild',
  OUTLANDER: 'outlander',
  SOVEREIGN_WEAVER: 'sovereign_weaver',
} as const;

export type SovereignTier = typeof SOVEREIGN_TIER[keyof typeof SOVEREIGN_TIER];
