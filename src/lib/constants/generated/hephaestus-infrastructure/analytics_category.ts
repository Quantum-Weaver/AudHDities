// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/analytics_category.ts
// GENERATED: 2026-04-22T18:15:11.212Z
// SOURCE: Constants.public.Enums.analytics_category
// VALUES: 5 entries
// =====================================================

export const ANALYTICS_CATEGORY = {
  PAGE_VIEW: 'page_view',
  USER_ACTION: 'user_action',
  SYSTEM: 'system',
  ERROR: 'error',
  PERFORMANCE: 'performance',
} as const;

export type AnalyticsCategory = typeof ANALYTICS_CATEGORY[keyof typeof ANALYTICS_CATEGORY];
