// =====================================================
// FILE: constants/generated/hestia-core/business_type.ts
// GENERATED: 2026-04-13T21:55:48.468Z
// SOURCE: Constants.public.Enums.business_type
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