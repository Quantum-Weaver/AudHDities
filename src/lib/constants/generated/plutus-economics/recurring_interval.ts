// =====================================================
// FILE: constants/generated/plutus-economics/recurring_interval.ts
// GENERATED: 2026-05-01T03:24:43.102Z
// SOURCE: Constants.public.Enums.recurring_interval
// VALUES: 6 entries
// =====================================================

export const RECURRING_INTERVAL = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  LIFETIME: 'lifetime',
  ONE_TME: 'one_tme',
} as const;

export type RecurringInterval = typeof RECURRING_INTERVAL[keyof typeof RECURRING_INTERVAL];
