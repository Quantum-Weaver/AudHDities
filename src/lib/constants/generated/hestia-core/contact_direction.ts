// =====================================================
// FILE: constants/hestia-core/contact_direction.ts
// GENERATED: 2026-04-13T16:36:33.080Z
// SOURCE: Constants.public.Enums.contact_direction
// VALUES: 2 entries
// =====================================================

export const CONTACT_DIRECTION = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
} as const;

export type ContactDirection = typeof CONTACT_DIRECTION[keyof typeof CONTACT_DIRECTION];
