// =====================================================
// FILE: constants/plutus-economics/stripe_mode.ts
// GENERATED: 2026-04-13T01:15:57.366Z
// SOURCE: Constants.public.Enums.stripe_mode
// VALUES: 2 entries
// =====================================================

export const STRIPE_MODE = {
  TEST: 'test',
  LIVE: 'live',
} as const;

export type StripeMode = typeof STRIPE_MODE[keyof typeof STRIPE_MODE];
