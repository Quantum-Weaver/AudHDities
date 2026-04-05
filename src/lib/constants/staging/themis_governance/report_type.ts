// =====================================================
// FILE: constants/report_type.ts
// GENERATED: 2026-04-05T18:12:45.097Z
// SOURCE: Constants.public.Enums.report_type
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
