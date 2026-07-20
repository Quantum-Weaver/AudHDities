// =====================================================
// FILE: constants/generated/hestia-core/subscription_tier.ts
// GENERATED: 2026-07-20T04:39:11.053Z
// SOURCE: Constants.public.Enums.subscription_tier
// VALUES: 4 entries
// =====================================================

export const SUBSCRIPTION_TIER = {
  COMMUNITY: 'community',
  ALLY: 'ally',
  COUNCIL: 'council',
  CORPORATE: 'corporate',
} as const;

export type SubscriptionTier = typeof SUBSCRIPTION_TIER[keyof typeof SUBSCRIPTION_TIER];
