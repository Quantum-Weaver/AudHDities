// =====================================================
// FILE: constants/generated/themis-governance/report_target_type.ts
// GENERATED: 2026-04-13T21:55:48.496Z
// SOURCE: Constants.public.Enums.report_target_type
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