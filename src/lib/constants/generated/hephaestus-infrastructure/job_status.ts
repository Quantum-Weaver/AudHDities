// =====================================================
// FILE: constants/hephaestus-infrastructure/job_status.ts
// GENERATED: 2026-04-13T16:36:33.084Z
// SOURCE: Constants.public.Enums.job_status
// VALUES: 4 entries
// =====================================================

export const JOB_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export type JobStatus = typeof JOB_STATUS[keyof typeof JOB_STATUS];
