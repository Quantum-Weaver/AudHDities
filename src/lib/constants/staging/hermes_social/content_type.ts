// =====================================================
// FILE: constants/content_type.ts
// GENERATED: 2026-04-05T19:46:33.322Z
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
