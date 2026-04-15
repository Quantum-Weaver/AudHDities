// =====================================================
// FILE: constants/generated/themis-governance/report_target_type.ts
// GENERATED: 2026-04-15T18:28:45.922Z
// SOURCE: Constants.public.Enums.report_target_type
// VALUES: 7 entries
// =====================================================

export const REPORT_TARGET_TYPE = {
  POST: 'post',
  COMMENT: 'comment',
  REPLY: 'reply',
  PRODUCT: 'product',
  MESSAGE: 'message',
  PROFILE: 'profile',
  CHANNEL: 'channel',
} as const;

export type ReportTargetType = typeof REPORT_TARGET_TYPE[keyof typeof REPORT_TARGET_TYPE];
