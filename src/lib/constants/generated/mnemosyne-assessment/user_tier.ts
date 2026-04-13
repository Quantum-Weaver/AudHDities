// =====================================================
// FILE: constants/generated/mnemosyne-assessment/user_tier.ts
// GENERATED: 2026-04-13T21:55:48.506Z
// SOURCE: Constants.public.Enums.user_tier
// =====================================================

export const USER_TIER = {
  COMMUNITY: 'community',
  ALLY: 'ally',
  CORPORATE: 'corporate',
  COUNCIL: 'council',
} as const;

export type UserTier = typeof USER_TIER[keyof typeof USER_TIER];