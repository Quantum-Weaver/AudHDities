// =====================================================
// FILE: constants/generated/hermes-social/action_type.ts
// GENERATED: 2026-05-01T15:32:00.027Z
// SOURCE: Constants.public.Enums.action_type
// VALUES: 12 entries
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
  PROFILE_CREATED: 'profile_created',
  SOVEREIGN_JOINED: 'sovereign_joined',
} as const;

export type ActionType = typeof ACTION_TYPE[keyof typeof ACTION_TYPE];
