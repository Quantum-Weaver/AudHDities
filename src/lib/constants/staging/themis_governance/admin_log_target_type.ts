// =====================================================
// FILE: constants/admin_log_target_type.ts
// GENERATED: 2026-04-05T18:12:44.929Z
// SOURCE: Constants.public.Enums.admin_log_target_type
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
