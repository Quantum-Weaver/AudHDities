// =====================================================
// FILE: constants/plutus-economics/owner_type.ts
// GENERATED: 2026-04-13T16:36:33.087Z
// SOURCE: Constants.public.Enums.owner_type
// VALUES: 2 entries
// =====================================================

export const OWNER_TYPE = {
  CREATOR: 'creator',
  VENDOR: 'vendor',
} as const;

export type OwnerType = typeof OWNER_TYPE[keyof typeof OWNER_TYPE];
