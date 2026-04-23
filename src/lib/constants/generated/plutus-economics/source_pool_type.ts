// =====================================================
// FILE: constants/generated/plutus-economics/source_pool_type.ts
// GENERATED: 2026-04-23T02:40:26.852Z
// SOURCE: Constants.public.Enums.source_pool_type
// VALUES: 3 entries
// =====================================================

export const SOURCE_POOL_TYPE = {
  RESIDUAL: 'residual',
  COVENANT: 'covenant',
  PLATFORM: 'platform',
} as const;

export type SourcePoolType = typeof SOURCE_POOL_TYPE[keyof typeof SOURCE_POOL_TYPE];
