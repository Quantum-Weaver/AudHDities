// =====================================================
// FILE: constants/generated/hestia-core/content_rating.ts
// GENERATED: 2026-04-13T21:47:20.888Z
// SOURCE: Constants.public.Enums.content_rating
// =====================================================

export const CONTENT_RATING = {
  GENERAL: 'general',
  MATURE: 'mature',
  TRIGGERING: 'triggering',
  EXPLICIT: 'explicit',
} as const;

export type ContentRating = typeof CONTENT_RATING[keyof typeof CONTENT_RATING];