// =====================================================
// FILE: constants/user_tier.ts
// GENERATED: 2026-04-05T21:55:13.134Z
// SOURCE: Constants.public.Enums.user_tier
// =====================================================

export const USER_TIER = {
  COMMUNITY: 'community',
  ALLY: 'ally',
  CORPORATE: 'corporate',
  COUNCIL: 'council',
} as const;

type UserTier = typeof USER_TIER[keyof typeof USER_TIER];
