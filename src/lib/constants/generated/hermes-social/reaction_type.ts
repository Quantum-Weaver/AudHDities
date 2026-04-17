// =====================================================
// FILE: constants/generated/hermes-social/reaction_type.ts
// GENERATED: 2026-04-17T22:45:09.255Z
// SOURCE: Constants.public.Enums.reaction_type
// VALUES: 5 entries
// =====================================================

export const REACTION_TYPE = {
  RESONATE: 'resonate',
  SUPPORT: 'support',
  APPRECIATE: 'appreciate',
  EMPATHY: 'empathy',
  CELEBRATE: 'celebrate',
} as const;

export type ReactionType = typeof REACTION_TYPE[keyof typeof REACTION_TYPE];
