// =====================================================
// FILE: constants/generated/themis-governance/report_status.ts
// GENERATED: 2026-04-13T21:47:20.911Z
// SOURCE: Constants.public.Enums.report_status
// =====================================================

export const REPORT_STATUS = {
  PENDING: 'pending',
  REVIEWING: 'reviewing',
  RESOLVED: 'resolved',
  DISMISSED: 'dismissed',
  ESCALATED: 'escalated',
} as const;

export type ReportStatus = typeof REPORT_STATUS[keyof typeof REPORT_STATUS];