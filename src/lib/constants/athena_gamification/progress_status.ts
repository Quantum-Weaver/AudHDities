// =====================================================
// FILE: constants/progress_status.ts
// GENERATED: 2026-04-05T18:10:53.226Z
// SOURCE: Constants.public.Enums.progress_status
// =====================================================

export const PROGRESS_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  MASTERED: 'mastered',
} as const;

export type ProgressStatus = typeof PROGRESS_STATUS[keyof typeof PROGRESS_STATUS];
