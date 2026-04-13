// =====================================================
// FILE: constants/generated/hestia-core/payout_frequency.ts
// GENERATED: 2026-04-13T21:55:48.489Z
// SOURCE: Constants.public.Enums.payout_frequency
// =====================================================

export const PAYOUT_FREQUENCY = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
} as const;

export type PayoutFrequency = typeof PAYOUT_FREQUENCY[keyof typeof PAYOUT_FREQUENCY];