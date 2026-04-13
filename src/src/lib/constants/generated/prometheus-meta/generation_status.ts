// =====================================================
// FILE: constants/generated/prometheus-meta/generation_status.ts
// GENERATED: 2026-04-13T21:47:20.895Z
// SOURCE: Constants.public.Enums.generation_status
// =====================================================

export const GENERATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export type GenerationStatus = typeof GENERATION_STATUS[keyof typeof GENERATION_STATUS];