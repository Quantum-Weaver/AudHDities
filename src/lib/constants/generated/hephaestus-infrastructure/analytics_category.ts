// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/analytics_category.ts
// GENERATED: 2026-04-17T17:34:19.563Z
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
