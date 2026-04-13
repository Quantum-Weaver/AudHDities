// =====================================================
// FILE: constants/generated/hermes-social/target_type.ts
// GENERATED: 2026-04-13T21:47:20.918Z
// SOURCE: Constants.public.Enums.target_type
// =====================================================

export const TARGET_TYPE = {
  POST: 'post',
  COMMENT: 'comment',
  PRODUCT: 'product',
  USER: 'user',
  CHANNEL: 'channel',
  QUEST: 'quest',
  BADGE: 'badge',
} as const;

export type TargetType = typeof TARGET_TYPE[keyof typeof TARGET_TYPE];