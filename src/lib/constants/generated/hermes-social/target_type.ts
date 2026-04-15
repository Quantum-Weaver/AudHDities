// =====================================================
// FILE: constants/generated/hermes-social/target_type.ts
// GENERATED: 2026-04-15T18:28:45.931Z
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
