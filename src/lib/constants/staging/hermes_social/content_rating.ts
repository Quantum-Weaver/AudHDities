// =====================================================
// FILE: constants/content_rating.ts
// GENERATED: 2026-04-05T21:48:03.593Z
// SOURCE: Constants.public.Enums.content_rating
// =====================================================

export const CONTENT_RATING = {
  GENERAL: 'general',
  MATURE: 'mature',
  TRIGGERING: 'triggering',
  EXPLICIT: 'explicit',
} as const;

export type ContentRating = typeof CONTENT_RATING[keyof typeof CONTENT_RATING];
