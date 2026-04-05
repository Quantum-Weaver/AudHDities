// =====================================================
// FILE: constants/analytics_category.ts
// GENERATED: 2026-04-05T18:12:44.942Z
// SOURCE: Constants.public.Enums.analytics_category
// =====================================================

export const ANALYTICS_CATEGORY = {
  PAGE_VIEW: 'page_view',
  USER_ACTION: 'user_action',
  SYSTEM: 'system',
  ERROR: 'error',
  PERFORMANCE: 'performance',
} as const;

export type AnalyticsCategory = typeof ANALYTICS_CATEGORY[keyof typeof ANALYTICS_CATEGORY];
