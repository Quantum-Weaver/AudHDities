// =====================================================
// FILE: constants/generated/iris-communications/contact_status.ts
// GENERATED: 2026-04-13T21:47:20.888Z
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