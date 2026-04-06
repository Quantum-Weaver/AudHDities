// =====================================================
// FILE: constants/moderation_target_type.ts
// GENERATED: 2026-04-05T21:48:03.661Z
// SOURCE: Constants.public.Enums.moderation_target_type
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
