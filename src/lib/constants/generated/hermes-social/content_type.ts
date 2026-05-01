// =====================================================
// FILE: constants/generated/hermes-social/content_type.ts
// GENERATED: 2026-05-01T15:32:00.055Z
// SOURCE: Constants.public.Enums.content_type
// VALUES: 6 entries
// =====================================================

export const CONTENT_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  MIXED: 'mixed',
  ARTICLE: 'article',
} as const;

export type ContentType = typeof CONTENT_TYPE[keyof typeof CONTENT_TYPE];
