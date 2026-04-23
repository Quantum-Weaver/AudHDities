// =====================================================
// FILE: constants/generated/hermes-social/action_type.ts
// GENERATED: 2026-04-23T02:14:53.897Z
// SOURCE: Constants.public.Enums.action_type
// VALUES: 10 entries
// =====================================================

export const ACTION_TYPE = {
  POST: 'post',
  COMMENT: 'comment',
  REACTION: 'reaction',
  EMERALD: 'emerald',
  FOLLOW: 'follow',
  SUBSCRIBE: 'subscribe',
  PURCHASE: 'purchase',
  JOIN_HOUSE: 'join_house',
  COMPLETE_QUEST: 'complete_quest',
  EARN_BADGE: 'earn_badge',
} as const;

export type ActionType = typeof ACTION_TYPE[keyof typeof ACTION_TYPE];
