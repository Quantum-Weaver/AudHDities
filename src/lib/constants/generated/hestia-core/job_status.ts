// =====================================================
// FILE: constants/generated/hestia-core/job_status.ts
// GENERATED: 2026-04-14T20:18:57.648Z
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
