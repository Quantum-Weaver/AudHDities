// =====================================================
// FILE: constants/generated/plutus-economics/subscription_status.ts
// GENERATED: 2026-04-13T21:47:20.915Z
// SOURCE: Constants.public.Enums.subscription_status
// =====================================================

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS];