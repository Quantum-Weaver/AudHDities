// =====================================================
// FILE: constants/generated/hestia-core/post_visibility.ts
// GENERATED: 2026-04-15T05:16:17.412Z
// SOURCE: Constants.public.Enums.post_visibility
// VALUES: 6 entries
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
