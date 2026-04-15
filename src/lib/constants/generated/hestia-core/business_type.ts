// =====================================================
// FILE: constants/generated/hestia-core/business_type.ts
// GENERATED: 2026-04-15T19:30:34.773Z
// SOURCE: Constants.public.Enums.business_type
// VALUES: 6 entries
// =====================================================

export const BUSINESS_TYPE = {
  SOLE_PROPRIETOR: 'sole_proprietor',
  LLC: 'llc',
  NONPROFIT: 'nonprofit',
  COOPERATIVE: 'cooperative',
  PARTNERSHIP: 'partnership',
  OTHER: 'other',
} as const;

export type BusinessType = typeof BUSINESS_TYPE[keyof typeof BUSINESS_TYPE];
