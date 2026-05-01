// =====================================================
// FILE: constants/generated/hestia-core/payout_method.ts
// GENERATED: 2026-05-01T03:24:43.053Z
// SOURCE: Constants.public.Enums.payout_method
// VALUES: 4 entries
// =====================================================

export const PAYOUT_METHOD = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  BANK: 'bank',
  CRYPTO: 'crypto',
} as const;

export type PayoutMethod = typeof PAYOUT_METHOD[keyof typeof PAYOUT_METHOD];
