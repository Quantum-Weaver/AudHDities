// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/job_type.ts
// GENERATED: 2026-04-23T02:40:26.744Z
// SOURCE: Constants.public.Enums.job_type
// VALUES: 3 entries
// =====================================================

export const JOB_TYPE = {
  CRON: 'cron',
  ONE_TIME: 'one_time',
  INTERVAL: 'interval',
} as const;

export type JobType = typeof JOB_TYPE[keyof typeof JOB_TYPE];
