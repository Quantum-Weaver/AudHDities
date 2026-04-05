// =====================================================
// FILE: constants/content_type.ts
// GENERATED: 2026-04-05T18:10:53.215Z
// SOURCE: Constants.public.Enums.content_type
// =====================================================

export const CONTENT_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  MIXED: 'mixed',
} as const;

export type ContentType = typeof CONTENT_TYPE[keyof typeof CONTENT_TYPE];
