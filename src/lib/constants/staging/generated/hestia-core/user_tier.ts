// =====================================================
// FILE: constants/generated/hestia-core/user_tier.ts
// GENERATED: 2026-04-21T21:16:50.804Z
// SOURCE: Constants.public.Enums.user_tier
// =====================================================

export const USER_TIER = {
  COMMUNITY: 'community',
  ALLY: 'ally',
  CORPORATE: 'corporate',
  COUNCIL: 'council',
} as const;

export type UserTier = typeof USER_TIER[keyof typeof USER_TIER];