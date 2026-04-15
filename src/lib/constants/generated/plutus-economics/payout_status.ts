// =====================================================
// FILE: constants/generated/plutus-economics/payout_status.ts
// GENERATED: 2026-04-15T01:41:07.611Z
// SOURCE: Constants.public.Enums.payout_status
// VALUES: 4 entries
// =====================================================

export const PAYOUT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export type PayoutStatus = typeof PAYOUT_STATUS[keyof typeof PAYOUT_STATUS];
