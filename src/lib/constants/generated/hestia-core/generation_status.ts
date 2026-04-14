// =====================================================
// FILE: constants/generated/hestia-core/generation_status.ts
// GENERATED: 2026-04-14T20:18:57.648Z
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
