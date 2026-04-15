// =====================================================
// FILE: constants/generated/hestia-core/subscription_status.ts
// GENERATED: 2026-04-15T05:16:17.443Z
// SOURCE: Constants.public.Enums.subscription_status
// VALUES: 4 entries
// =====================================================

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS];
