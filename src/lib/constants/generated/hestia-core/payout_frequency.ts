// =====================================================
// FILE: constants/generated/hestia-core/payout_frequency.ts
// GENERATED: 2026-05-01T03:24:43.049Z
// SOURCE: Constants.public.Enums.payout_frequency
// VALUES: 3 entries
// =====================================================

export const PAYOUT_FREQUENCY = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
} as const;

export type PayoutFrequency = typeof PAYOUT_FREQUENCY[keyof typeof PAYOUT_FREQUENCY];
