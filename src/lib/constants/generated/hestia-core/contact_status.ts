// =====================================================
// FILE: constants/generated/hestia-core/contact_status.ts
// GENERATED: 2026-04-14T20:18:57.639Z
// SOURCE: Constants.public.Enums.contact_status
// VALUES: 5 entries
// =====================================================

export const CONTACT_STATUS = {
  NEW: 'new',
  READ: 'read',
  REPLIED: 'replied',
  RESOLVED: 'resolved',
  SPAM: 'spam',
} as const;

export type ContactStatus = typeof CONTACT_STATUS[keyof typeof CONTACT_STATUS];
