// =====================================================
// FILE: constants/generated/hestia-core/message_status.ts
// GENERATED: 2026-04-15T05:16:17.377Z
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
