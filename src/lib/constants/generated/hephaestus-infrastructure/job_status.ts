// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/job_status.ts
// GENERATED: 2026-04-13T21:55:48.480Z
// SOURCE: Constants.public.Enums.job_status
// =====================================================

export const JOB_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export type JobStatus = typeof JOB_STATUS[keyof typeof JOB_STATUS];