// =====================================================
// FILE: constants/generated/hermes-social/content_type.ts
// GENERATED: 2026-04-30T15:32:13.975Z
// SOURCE: Constants.public.Enums.content_type
// VALUES: 5 entries
// =====================================================

export const CONTENT_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  MIXED: 'mixed',
} as const;

export type ContentType = typeof CONTENT_TYPE[keyof typeof CONTENT_TYPE];
