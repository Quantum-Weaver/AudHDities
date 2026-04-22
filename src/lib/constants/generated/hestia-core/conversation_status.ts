// =====================================================
// FILE: constants/generated/hestia-core/conversation_status.ts
// GENERATED: 2026-04-22T18:24:20.387Z
// SOURCE: Constants.public.Enums.conversation_status
// VALUES: 4 entries
// =====================================================

export const CONVERSATION_STATUS = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  RESOLVED: 'resolved',
  PENDING: 'pending',
} as const;

export type ConversationStatus = typeof CONVERSATION_STATUS[keyof typeof CONVERSATION_STATUS];
