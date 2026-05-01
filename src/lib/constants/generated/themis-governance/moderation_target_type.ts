// =====================================================
// FILE: constants/generated/themis-governance/moderation_target_type.ts
// GENERATED: 2026-05-01T15:32:00.084Z
// SOURCE: Constants.public.Enums.moderation_target_type
// VALUES: 7 entries
// =====================================================

export const MODERATION_TARGET_TYPE = {
  USER: 'user',
  POST: 'post',
  COMMENT: 'comment',
  REPLY: 'reply',
  PRODUCT: 'product',
  MESSAGE: 'message',
  CHANNEL: 'channel',
} as const;

export type ModerationTargetType = typeof MODERATION_TARGET_TYPE[keyof typeof MODERATION_TARGET_TYPE];
