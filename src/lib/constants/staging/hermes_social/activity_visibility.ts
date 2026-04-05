// =====================================================
// FILE: constants/activity_visibility.ts
// GENERATED: 2026-04-05T18:12:44.922Z
// SOURCE: Constants.public.Enums.activity_visibility
// =====================================================

export const ACTIVITY_VISIBILITY = {
  PUBLIC: 'public',
  FOLLOWERS: 'followers',
  PRIVATE: 'private',
} as const;

export type ActivityVisibility = typeof ACTIVITY_VISIBILITY[keyof typeof ACTIVITY_VISIBILITY];
