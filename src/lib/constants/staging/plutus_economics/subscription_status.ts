// =====================================================
// FILE: constants/subscription_status.ts
// GENERATED: 2026-04-05T19:46:33.384Z
// SOURCE: Constants.public.Enums.subscription_status
// =====================================================

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS];
