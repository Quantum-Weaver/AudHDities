// =====================================================
// FILE: constants/payout_method.ts
// GENERATED: 2026-04-05T21:55:13.234Z
// SOURCE: Constants.public.Enums.payout_method
// =====================================================

export const PAYOUT_METHOD = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  BANK: 'bank',
  CRYPTO: 'crypto',
} as const;

type PayoutMethod = typeof PAYOUT_METHOD[keyof typeof PAYOUT_METHOD];
