// =====================================================
// FILE: constants/generated/hermes-social/message_status.ts
// GENERATED: 2026-04-13T21:47:20.900Z
// SOURCE: Constants.public.Enums.message_status
// =====================================================

export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  DELETED: 'deleted',
} as const;

export type MessageStatus = typeof MESSAGE_STATUS[keyof typeof MESSAGE_STATUS];