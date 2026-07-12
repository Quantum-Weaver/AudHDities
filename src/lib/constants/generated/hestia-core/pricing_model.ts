// =====================================================
// FILE: constants/generated/hestia-core/pricing_model.ts
// GENERATED: 2026-07-10T18:15:00.035Z
// SOURCE: Constants.public.Enums.pricing_model
// VALUES: 4 entries
// =====================================================

export const PRICING_MODEL = {
  FREE: 'free',
  FIXED: 'fixed',
  PAY_WHAT_YOU_WANT: 'pay_what_you_want',
  PATRONAGE_ONLY: 'patronage_only',
} as const;

export type PricingModel = typeof PRICING_MODEL[keyof typeof PRICING_MODEL];
