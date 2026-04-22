// =====================================================
// FILE: constants/generated/prometheus-meta/generation_status.ts
// GENERATED: 2026-04-22T18:24:20.439Z
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
