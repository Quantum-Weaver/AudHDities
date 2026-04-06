// =====================================================
// FILE: constants/recurring_interval.ts
// GENERATED: 2026-04-05T21:55:13.249Z
// SOURCE: Constants.public.Enums.recurring_interval
// =====================================================

export const RECURRING_INTERVAL = {
  MONTH: 'month',
  YEAR: 'year',
} as const;

export type RecurringInterval = typeof RECURRING_INTERVAL[keyof typeof RECURRING_INTERVAL];
