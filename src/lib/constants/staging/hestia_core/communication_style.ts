// =====================================================
// FILE: constants/communication_style.ts
// GENERATED: 2026-04-05T21:55:13.170Z
// SOURCE: Constants.public.Enums.communication_style
// =====================================================

export const COMMUNICATION_STYLE = {
  DIRECT: 'direct',
  GENTLE: 'gentle',
  DETAILED: 'detailed',
  CONCISE: 'concise',
} as const;

export type CommunicationStyle = typeof COMMUNICATION_STYLE[keyof typeof COMMUNICATION_STYLE];
