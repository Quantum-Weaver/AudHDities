// =====================================================
// FILE: constants/generated/hermes-social/content_type.ts
// GENERATED: 2026-04-13T21:47:20.889Z
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