// =====================================================
// FILE: constants/generated/hestia-core/shipping_requirements.ts
// GENERATED: 2026-05-01T15:32:00.113Z
// SOURCE: Constants.public.Enums.shipping_requirements
// VALUES: 7 entries
// =====================================================

export const SHIPPING_REQUIREMENTS = {
  NONE: 'none',
  SIMPLE: 'simple',
  INSURED: 'insured',
  SIGNATURE: 'signature',
  INTERNATIONAL: 'international',
  FRAGILE: 'fragile',
  TEMPERATURE_CONTROLLED: 'temperature_controlled',
} as const;

export type ShippingRequirements = typeof SHIPPING_REQUIREMENTS[keyof typeof SHIPPING_REQUIREMENTS];
