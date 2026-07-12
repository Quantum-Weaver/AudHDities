// =====================================================
// FILE: constants/generated/hestia-core/work_type.ts
// GENERATED: 2026-07-10T18:15:00.046Z
// SOURCE: Constants.public.Enums.work_type
// VALUES: 6 entries
// =====================================================

export const WORK_TYPE = {
  MUSIC: 'music',
  WRITING: 'writing',
  VISION: 'vision',
  PERFORMANCE: 'performance',
  CODE: 'code',
  OTHER: 'other',
} as const;

export type WorkType = typeof WORK_TYPE[keyof typeof WORK_TYPE];
