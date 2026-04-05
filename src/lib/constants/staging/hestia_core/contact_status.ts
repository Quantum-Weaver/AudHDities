// =====================================================
// FILE: constants/contact_status.ts
// GENERATED: 2026-04-05T19:46:33.252Z
// SOURCE: Constants.public.Enums.contact_status
// =====================================================

export const CONTACT_STATUS = {
  NEW: 'new',
  READ: 'read',
  REPLIED: 'replied',
  RESOLVED: 'resolved',
  SPAM: 'spam',
} as const;

export type ContactStatus = typeof CONTACT_STATUS[keyof typeof CONTACT_STATUS];
