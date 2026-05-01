// =====================================================
// FILE: constants/generated/plutus-economics/source_pool_type.ts
// GENERATED: 2026-05-01T15:32:00.114Z
// SOURCE: Constants.public.Enums.source_pool_type
// VALUES: 3 entries
// =====================================================

export const SOURCE_POOL_TYPE = {
  RESIDUAL: 'residual',
  COVENANT: 'covenant',
  PLATFORM: 'platform',
} as const;

export type SourcePoolType = typeof SOURCE_POOL_TYPE[keyof typeof SOURCE_POOL_TYPE];
