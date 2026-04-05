// =====================================================
// FILE: constants/payment_status.ts
// GENERATED: 2026-04-05T18:12:45.112Z
// SOURCE: Constants.public.Enums.payment_status
// =====================================================

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  REFUNDED: 'refunded',
  FAILED: 'failed',
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
