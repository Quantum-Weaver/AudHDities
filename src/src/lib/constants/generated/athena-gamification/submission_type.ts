// =====================================================
// FILE: constants/generated/athena-gamification/submission_type.ts
// GENERATED: 2026-04-13T21:47:20.915Z
// SOURCE: Constants.public.Enums.submission_type
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