// =====================================================
// FILE: constants/generated/plutus-economics/source_pool_type.ts
// GENERATED: 2026-04-13T21:55:48.498Z
// SOURCE: Constants.public.Enums.source_pool_type
// =====================================================

export const SOURCE_POOL_TYPE = {
  RESIDUAL: 'residual',
  COVENANT: 'covenant',
  PLATFORM: 'platform',
} as const;

export type SourcePoolType = typeof SOURCE_POOL_TYPE[keyof typeof SOURCE_POOL_TYPE];