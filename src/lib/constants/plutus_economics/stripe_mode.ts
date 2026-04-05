// =====================================================
// FILE: constants/stripe_mode.ts
// GENERATED: 2026-04-05T18:10:53.245Z
// SOURCE: Constants.public.Enums.stripe_mode
// =====================================================

export const STRIPE_MODE = {
  TEST: 'test',
  LIVE: 'live',
} as const;

export type StripeMode = typeof STRIPE_MODE[keyof typeof STRIPE_MODE];
