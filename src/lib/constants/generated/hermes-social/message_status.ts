// =====================================================
// FILE: constants/hermes-social/message_status.ts
// GENERATED: 2026-04-13T16:36:33.086Z
// SOURCE: Constants.public.Enums.message_status
// VALUES: 4 entries
// =====================================================

export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  DELETED: 'deleted',
} as const;

export type MessageStatus = typeof MESSAGE_STATUS[keyof typeof MESSAGE_STATUS];
