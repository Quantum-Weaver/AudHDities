// =====================================================
// FILE: constants/email_status.ts
// GENERATED: 2026-04-05T18:10:53.188Z
// SOURCE: Constants.public.Enums.email_status
// =====================================================

export const EMAIL_STATUS = {
  QUEUED: 'queued',
  SENT: 'sent',
  DELIVERED: 'delivered',
  OPENED: 'opened',
  CLICKED: 'clicked',
  BOUNCED: 'bounced',
  FAILED: 'failed',
} as const;

export type EmailStatus = typeof EMAIL_STATUS[keyof typeof EMAIL_STATUS];
