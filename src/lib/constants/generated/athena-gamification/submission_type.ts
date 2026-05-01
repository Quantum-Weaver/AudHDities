// =====================================================
// FILE: constants/generated/athena-gamification/submission_type.ts
// GENERATED: 2026-05-01T03:24:43.152Z
// SOURCE: Constants.public.Enums.submission_type
// VALUES: 7 entries
// =====================================================

export const SUBMISSION_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  AUDIO: 'audio',
  VIDEO: 'video',
  LINK: 'link',
  AUTO: 'auto',
} as const;

export type SubmissionType = typeof SUBMISSION_TYPE[keyof typeof SUBMISSION_TYPE];
