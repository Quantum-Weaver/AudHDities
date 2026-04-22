// =====================================================
// FILE: constants/generated/themis-governance/admin_log_target_type.ts
// GENERATED: 2026-04-22T05:48:51.159Z
// SOURCE: Constants.public.Enums.admin_log_target_type
// VALUES: 8 entries
// =====================================================

export const ADMIN_LOG_TARGET_TYPE = {
  USER: 'user',
  CREATOR: 'creator',
  VENDOR: 'vendor',
  PRODUCT: 'product',
  SALE: 'sale',
  PAYOUT: 'payout',
  REPORT: 'report',
  SYSTEM: 'system',
} as const;

export type AdminLogTargetType = typeof ADMIN_LOG_TARGET_TYPE[keyof typeof ADMIN_LOG_TARGET_TYPE];
