// =====================================================
// FILE: constants/post_visibility.ts
// GENERATED: 2026-04-05T19:46:33.324Z
// SOURCE: Constants.public.Enums.post_visibility
// =====================================================

export const POST_VISIBILITY = {
  PUBLIC: 'public',
  SUBSCRIBERS: 'subscribers',
  TIER_COMMUNITY: 'tier_community',
  TIER_ALLY: 'tier_ally',
  TIER_CORPORATE: 'tier_corporate',
  PRIVATE: 'private',
} as const;

export type PostVisibility = typeof POST_VISIBILITY[keyof typeof POST_VISIBILITY];
