// =====================================================
// FILE: constants/generated/hestia-core/report_type.ts
// GENERATED: 2026-04-15T05:16:17.430Z
// SOURCE: Constants.public.Enums.report_type
// VALUES: 7 entries
// =====================================================

export const REPORT_TYPE = {
  INAPPROPRIATE_CONTENT: 'inappropriate_content',
  HARASSMENT: 'harassment',
  SPAM: 'spam',
  HATE_SPEECH: 'hate_speech',
  IMPERSONATION: 'impersonation',
  COPYRIGHT: 'copyright',
  OTHER: 'other',
} as const;

export type ReportType = typeof REPORT_TYPE[keyof typeof REPORT_TYPE];
