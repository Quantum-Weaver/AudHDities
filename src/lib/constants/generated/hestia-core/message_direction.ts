// =====================================================
// FILE: constants/generated/hestia-core/message_direction.ts
// GENERATED: 2026-04-17T09:51:12.272Z
// SOURCE: Constants.public.Enums.message_direction
// VALUES: 3 entries
// =====================================================

export const MESSAGE_DIRECTION = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
  INTERNAL: 'internal',
} as const;

export type MessageDirection = typeof MESSAGE_DIRECTION[keyof typeof MESSAGE_DIRECTION];
