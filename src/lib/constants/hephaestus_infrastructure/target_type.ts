// =====================================================
// FILE: constants/target_type.ts
// GENERATED: 2026-04-05T18:10:53.144Z
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
