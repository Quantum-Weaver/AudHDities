// =====================================================
// FILE: constants/generated/plutus-economics/ware_type.ts
// GENERATED: 2026-08-01T21:41:40.220Z
// SOURCE: Constants.public.Enums.ware_type
// VALUES: 3 entries
// =====================================================

export const WARE_TYPE = {
  PHYSICAL: 'physical',
  DIGITAL: 'digital',
  SERVICE: 'service',
} as const;

export type WareType = typeof WARE_TYPE[keyof typeof WARE_TYPE];
