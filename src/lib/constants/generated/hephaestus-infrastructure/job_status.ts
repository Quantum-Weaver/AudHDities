// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/job_status.ts
// GENERATED: 2026-04-17T17:34:19.593Z
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
