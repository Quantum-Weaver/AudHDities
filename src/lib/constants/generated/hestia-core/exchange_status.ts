// =====================================================
// FILE: constants/generated/hestia-core/exchange_status.ts
// GENERATED: 2026-08-01T16:03:07.227Z
// SOURCE: Constants.public.Enums.exchange_status
// VALUES: 4 entries
// =====================================================

export const EXCHANGE_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export type ExchangeStatus = typeof EXCHANGE_STATUS[keyof typeof EXCHANGE_STATUS];
