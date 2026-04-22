// =====================================================
// FILE: constants/generated/iris-communications/email_status.ts
// GENERATED: 2026-04-22T05:15:36.242Z
// SOURCE: Constants.public.Enums.email_status
// VALUES: 7 entries
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
