// =====================================================
// FILE: constants/generated/plutus-economics/payout_method.ts
// GENERATED: 2026-04-13T21:55:48.490Z
// SOURCE: Constants.public.Enums.payout_method
// =====================================================

export const PAYOUT_METHOD = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  BANK: 'bank',
  CRYPTO: 'crypto',
} as const;

export type PayoutMethod = typeof PAYOUT_METHOD[keyof typeof PAYOUT_METHOD];