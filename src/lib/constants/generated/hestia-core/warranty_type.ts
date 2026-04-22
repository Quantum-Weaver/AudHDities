// =====================================================
// FILE: constants/generated/hestia-core/warranty_type.ts
// GENERATED: 2026-04-22T18:15:11.479Z
// SOURCE: Constants.public.Enums.warranty_type
// VALUES: 6 entries
// =====================================================

export const WARRANTY_TYPE = {
  NONE: 'none',
  SATISFACTION_GUARANTEE: 'satisfaction_guarantee',
  REPAIR_REPLACEMENT: 'repair_replacement',
  LIMITED_TIME: 'limited_time',
  LIFETIME: 'lifetime',
  DIGITAL_REFUND: 'digital_refund',
} as const;

export type WarrantyType = typeof WARRANTY_TYPE[keyof typeof WARRANTY_TYPE];
