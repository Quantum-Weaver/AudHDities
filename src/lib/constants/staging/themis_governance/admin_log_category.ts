// =====================================================
// FILE: constants/admin_log_category.ts
// GENERATED: 2026-04-05T19:46:33.204Z
// SOURCE: Constants.public.Enums.admin_log_category
// =====================================================

export const ADMIN_LOG_CATEGORY = {
  USER_MANAGEMENT: 'user_management',
  CONTENT_MODERATION: 'content_moderation',
  FINANCIAL: 'financial',
  SYSTEM_CONFIG: 'system_config',
  VERIFICATION: 'verification',
  REPORT_HANDLING: 'report_handling',
} as const;

export type AdminLogCategory = typeof ADMIN_LOG_CATEGORY[keyof typeof ADMIN_LOG_CATEGORY];
