// =====================================================
// FILE: constants/generated/hestia-core/user_tier.ts
// GENERATED: 2026-04-22T05:48:51.378Z
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
