// =====================================================
// FILE: constants/hestia-core/user_tier.ts
// GENERATED: 2026-04-13T01:15:57.372Z
// SOURCE: Constants.public.Enums.user_tier
// VALUES: 4 entries
// =====================================================

export const USER_TIER = {
  COMMUNITY: 'community',
  ALLY: 'ally',
  CORPORATE: 'corporate',
  COUNCIL: 'council',
} as const;

export type UserTier = typeof USER_TIER[keyof typeof USER_TIER];
