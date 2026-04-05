// =====================================================
// FILE: constants/owner_type.ts
// GENERATED: 2026-04-05T18:10:53.220Z
// SOURCE: Constants.public.Enums.owner_type
// =====================================================

export const OWNER_TYPE = {
  CREATOR: 'creator',
  VENDOR: 'vendor',
} as const;

export type OwnerType = typeof OWNER_TYPE[keyof typeof OWNER_TYPE];
