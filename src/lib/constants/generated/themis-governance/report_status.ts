// =====================================================
// FILE: constants/generated/themis-governance/report_status.ts
// GENERATED: 2026-04-30T15:32:14.031Z
// SOURCE: Constants.public.Enums.report_status
// VALUES: 5 entries
// =====================================================

export const REPORT_STATUS = {
  PENDING: 'pending',
  REVIEWING: 'reviewing',
  RESOLVED: 'resolved',
  DISMISSED: 'dismissed',
  ESCALATED: 'escalated',
} as const;

export type ReportStatus = typeof REPORT_STATUS[keyof typeof REPORT_STATUS];
