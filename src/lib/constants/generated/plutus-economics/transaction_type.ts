// =====================================================
// FILE: constants/generated/plutus-economics/transaction_type.ts
// GENERATED: 2026-04-22T18:15:11.468Z
// SOURCE: Constants.public.Enums.transaction_type
// VALUES: 5 entries
// =====================================================

export const TRANSACTION_TYPE = {
  SALE: 'sale',
  RESIDUAL: 'residual',
  DISBURSEMENT: 'disbursement',
  PAYOUT: 'payout',
  REFUND: 'refund',
} as const;

export type TransactionType = typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE];
