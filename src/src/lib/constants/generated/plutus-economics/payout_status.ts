// =====================================================
// FILE: constants/generated/plutus-economics/payout_status.ts
// GENERATED: 2026-04-13T21:47:20.906Z
// SOURCE: Constants.public.Enums.payout_status
// =====================================================

export const PAYOUT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export type PayoutStatus = typeof PAYOUT_STATUS[keyof typeof PAYOUT_STATUS];