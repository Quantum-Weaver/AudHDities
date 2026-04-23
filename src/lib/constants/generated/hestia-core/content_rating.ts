// =====================================================
// FILE: constants/generated/hestia-core/content_rating.ts
// GENERATED: 2026-04-23T02:40:26.692Z
// SOURCE: Constants.public.Enums.content_rating
// VALUES: 4 entries
// =====================================================

export const CONTENT_RATING = {
  GENERAL: 'general',
  MATURE: 'mature',
  TRIGGERING: 'triggering',
  EXPLICIT: 'explicit',
} as const;

export type ContentRating = typeof CONTENT_RATING[keyof typeof CONTENT_RATING];
