// =====================================================
// FILE: constants/generated/hestia-core/progress_status.ts
// GENERATED: 2026-04-15T05:16:17.417Z
// SOURCE: Constants.public.Enums.progress_status
// VALUES: 4 entries
// =====================================================

export const PROGRESS_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  MASTERED: 'mastered',
} as const;

export type ProgressStatus = typeof PROGRESS_STATUS[keyof typeof PROGRESS_STATUS];
