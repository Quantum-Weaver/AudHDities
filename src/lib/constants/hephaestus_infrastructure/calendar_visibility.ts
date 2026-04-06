// =====================================================
// FILE: constants/calendar_visibility.ts
// GENERATED: 2026-04-05T21:55:13.168Z
// SOURCE: Constants.public.Enums.calendar_visibility
// =====================================================

export const CALENDAR_VISIBILITY = {
  PUBLIC: 'public',
  HOUSE: 'house',
  ADMIN: 'admin',
} as const;

export type CalendarVisibility = typeof CALENDAR_VISIBILITY[keyof typeof CALENDAR_VISIBILITY];
