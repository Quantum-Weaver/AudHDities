// =====================================================
// FILE: constants/generated/hestia-core/target_type.ts
// GENERATED: 2026-04-14T20:18:57.674Z
// SOURCE: Constants.public.Enums.target_type
// VALUES: 7 entries
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
