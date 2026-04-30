// =====================================================
// FILE: constants/generated/hestia-core/communication_style.ts
// GENERATED: 2026-04-30T04:17:48.831Z
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
