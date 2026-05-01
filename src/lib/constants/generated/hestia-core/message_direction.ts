// =====================================================
// FILE: constants/generated/hestia-core/message_direction.ts
// GENERATED: 2026-05-01T15:32:00.081Z
// SOURCE: Constants.public.Enums.message_direction
// VALUES: 3 entries
// =====================================================

export const MESSAGE_DIRECTION = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
  INTERNAL: 'internal',
} as const;

export type MessageDirection = typeof MESSAGE_DIRECTION[keyof typeof MESSAGE_DIRECTION];
