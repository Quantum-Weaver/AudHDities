// =====================================================
// FILE: constants/hephaestus-infrastructure/calendar_visibility.ts
// GENERATED: 2026-04-13T01:15:57.347Z
// SOURCE: Constants.public.Enums.calendar_visibility
// VALUES: 3 entries
// =====================================================

export const CALENDAR_VISIBILITY = {
  PUBLIC: 'public',
  HOUSE: 'house',
  ADMIN: 'admin',
} as const;

export type CalendarVisibility = typeof CALENDAR_VISIBILITY[keyof typeof CALENDAR_VISIBILITY];
