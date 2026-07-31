// =====================================================
// FILE: constants/generated/hestia-core/ware_type.ts
// GENERATED: 2026-07-31T01:03:41.954Z
// SOURCE: Constants.public.Enums.ware_type
// VALUES: 3 entries
// =====================================================

export const WARE_TYPE = {
  PHYSICAL: 'physical',
  DIGITAL: 'digital',
  SERVICE: 'service',
} as const;

export type WareType = typeof WARE_TYPE[keyof typeof WARE_TYPE];
