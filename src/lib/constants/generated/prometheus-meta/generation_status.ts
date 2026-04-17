// =====================================================
// FILE: constants/generated/prometheus-meta/generation_status.ts
// GENERATED: 2026-04-17T17:34:19.592Z
// SOURCE: Constants.public.Enums.generation_status
// VALUES: 5 entries
// =====================================================

export const GENERATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export type GenerationStatus = typeof GENERATION_STATUS[keyof typeof GENERATION_STATUS];
