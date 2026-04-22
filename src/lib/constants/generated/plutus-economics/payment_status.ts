// =====================================================
// FILE: constants/generated/plutus-economics/payment_status.ts
// GENERATED: 2026-04-22T04:38:07.114Z
// SOURCE: Constants.public.Enums.payment_status
// VALUES: 4 entries
// =====================================================

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  REFUNDED: 'refunded',
  FAILED: 'failed',
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
