// =====================================================
// FILE: constants/payout_method.ts
// GENERATED: 2026-04-05T18:12:45.060Z
// SOURCE: Constants.public.Enums.payout_method
// =====================================================

export const PAYOUT_METHOD = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  BANK: 'bank',
  CRYPTO: 'crypto',
} as const;

export type PayoutMethod = typeof PAYOUT_METHOD[keyof typeof PAYOUT_METHOD];
