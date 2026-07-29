// =====================================================
// FILE: constants/generated/hestia-core/visibility.ts
// GENERATED: 2026-07-29T16:16:54.179Z
// SOURCE: Constants.public.Enums.visibility
// VALUES: 4 entries
// =====================================================

export const VISIBILITY = {
  PUBLIC: 'public',
  COMMUNITY: 'community',
  CONNECTIONS: 'connections',
  PRIVATE: 'private',
} as const;

export type Visibility = typeof VISIBILITY[keyof typeof VISIBILITY];
