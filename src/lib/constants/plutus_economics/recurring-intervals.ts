/* @/lib/constants/economics/recurring-intervals.ts */

export const RECURRING_INTERVALS = {
    'month':'Month',
    'year':'Year'
}

export type RecurringIntervals = typeof RECURRING_INTERVALS[keyof typeof RECURRING_INTERVALS];