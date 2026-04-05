// =====================================================
// FILE: constants/reaction_type.ts
// GENERATED: 2026-04-05T19:46:33.351Z
// SOURCE: Constants.public.Enums.reaction_type
// =====================================================

export const REACTION_TYPE = {
  RESONATE: 'resonate',
  SUPPORT: 'support',
  APPRECIATE: 'appreciate',
  EMPATHY: 'empathy',
  CELEBRATE: 'celebrate',
} as const;

export type ReactionType = typeof REACTION_TYPE[keyof typeof REACTION_TYPE];
