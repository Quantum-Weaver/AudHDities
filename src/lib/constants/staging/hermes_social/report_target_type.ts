// =====================================================
// FILE: constants/report_target_type.ts
// GENERATED: 2026-04-05T19:46:33.359Z
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
