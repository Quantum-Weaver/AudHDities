// =====================================================
// FILE: constants/contact_direction.ts
// GENERATED: 2026-04-05T18:12:44.980Z
// SOURCE: Constants.public.Enums.contact_direction
// =====================================================

export const CONTACT_DIRECTION = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
} as const;

export type ContactDirection = typeof CONTACT_DIRECTION[keyof typeof CONTACT_DIRECTION];
