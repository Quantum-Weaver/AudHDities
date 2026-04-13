// =====================================================
// FILE: constants/generated/aethelred-connections/stripe_mode.ts
// GENERATED: 2026-04-13T21:55:48.499Z
// SOURCE: Constants.public.Enums.stripe_mode
// =====================================================

export const STRIPE_MODE = {
  TEST: 'test',
  LIVE: 'live',
} as const;

export type StripeMode = typeof STRIPE_MODE[keyof typeof STRIPE_MODE];