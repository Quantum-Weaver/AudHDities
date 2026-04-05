// =====================================================
// FILE: constants/transaction_type.ts
// GENERATED: 2026-04-05T18:12:45.158Z
// SOURCE: Constants.public.Enums.transaction_type
// =====================================================

export const TRANSACTION_TYPE = {
  SALE: 'sale',
  RESIDUAL: 'residual',
  DISBURSEMENT: 'disbursement',
  PAYOUT: 'payout',
  REFUND: 'refund',
} as const;

export type TransactionType = typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE];
