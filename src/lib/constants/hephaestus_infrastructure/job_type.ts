// =====================================================
// FILE: constants/job_type.ts
// GENERATED: 2026-04-05T18:10:53.239Z
// SOURCE: Constants.public.Enums.job_type
// =====================================================

export const JOB_TYPE = {
  CRON: 'cron',
  ONE_TIME: 'one_time',
  INTERVAL: 'interval',
} as const;

export type JobType = typeof JOB_TYPE[keyof typeof JOB_TYPE];
