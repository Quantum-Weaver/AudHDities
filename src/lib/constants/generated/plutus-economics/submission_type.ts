// =====================================================
// FILE: constants/plutus-economics/submission_type.ts
// GENERATED: 2026-04-13T16:36:33.092Z
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
