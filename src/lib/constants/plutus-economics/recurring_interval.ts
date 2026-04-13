// =====================================================
// FILE: constants/plutus-economics/recurring_interval.ts
// GENERATED: 2026-04-13T01:15:57.363Z
// SOURCE: Constants.public.Enums.recurring_interval
// VALUES: 2 entries
// =====================================================

export const RECURRING_INTERVAL = {
  MONTH: 'month',
  YEAR: 'year',
} as const;

export type RecurringInterval = typeof RECURRING_INTERVAL[keyof typeof RECURRING_INTERVAL];
