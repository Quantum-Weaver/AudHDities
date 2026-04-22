// =====================================================
// FILE: constants/generated/hestia-core/commission_status.ts
// GENERATED: 2026-04-22T04:38:06.989Z
// SOURCE: Constants.public.Enums.commission_status
// VALUES: 10 entries
// =====================================================

export const COMMISSION_STATUS = {
  INQUIRING: 'inquiring',
  QUOTING: 'quoting',
  DEPOSIT_PAID: 'deposit_paid',
  IN_PROGRESS: 'in_progress',
  READY_FOR_REVIEW: 'ready_for_review',
  REVISIONS_REQUESTED: 'revisions_requested',
  COMPLETED: 'completed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export type CommissionStatus = typeof COMMISSION_STATUS[keyof typeof COMMISSION_STATUS];
