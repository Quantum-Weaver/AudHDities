// =====================================================
// FILE: constants/generated/hermes-social/activity_visibility.ts
// GENERATED: 2026-04-22T04:38:06.923Z
// SOURCE: Constants.public.Enums.activity_visibility
// VALUES: 3 entries
// =====================================================

export const ACTIVITY_VISIBILITY = {
  PUBLIC: 'public',
  FOLLOWERS: 'followers',
  PRIVATE: 'private',
} as const;

export type ActivityVisibility = typeof ACTIVITY_VISIBILITY[keyof typeof ACTIVITY_VISIBILITY];
