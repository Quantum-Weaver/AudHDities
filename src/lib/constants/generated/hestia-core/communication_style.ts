// =====================================================
// FILE: constants/generated/hestia-core/communication_style.ts
// GENERATED: 2026-04-17T17:34:19.575Z
// SOURCE: Constants.public.Enums.communication_style
// VALUES: 4 entries
// =====================================================

export const COMMUNICATION_STYLE = {
  DIRECT: 'direct',
  GENTLE: 'gentle',
  DETAILED: 'detailed',
  CONCISE: 'concise',
} as const;

export type CommunicationStyle = typeof COMMUNICATION_STYLE[keyof typeof COMMUNICATION_STYLE];
