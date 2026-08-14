// =====================================================
// FILE: constants/generated/hestia-core/herald_digest.ts
// GENERATED: 2026-08-01T21:41:40.209Z
// SOURCE: Constants.public.Enums.herald_digest
// VALUES: 5 entries
// =====================================================

export const HERALD_DIGEST = {
  INSTANT: 'instant',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  NEVER: 'never',
} as const;

export type HeraldDigest = typeof HERALD_DIGEST[keyof typeof HERALD_DIGEST];
