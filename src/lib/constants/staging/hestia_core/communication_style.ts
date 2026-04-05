// =====================================================
// FILE: constants/communication_style.ts
// GENERATED: 2026-04-05T19:46:33.247Z
// SOURCE: Constants.public.Enums.communication_style
// =====================================================

export const COMMUNICATION_STYLE = {
  DIRECT: 'direct',
  GENTLE: 'gentle',
  DETAILED: 'detailed',
  CONCISE: 'concise',
} as const;

export type CommunicationStyle = typeof COMMUNICATION_STYLE[keyof typeof COMMUNICATION_STYLE];
