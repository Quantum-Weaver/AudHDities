// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/calendar_visibility.ts
// GENERATED: 2026-04-30T04:17:48.821Z
// SOURCE: Constants.public.Enums.calendar_visibility
// VALUES: 3 entries
// =====================================================

export const CALENDAR_VISIBILITY = {
  PUBLIC: 'public',
  HOUSE: 'house',
  ADMIN: 'admin',
} as const;

export type CalendarVisibility = typeof CALENDAR_VISIBILITY[keyof typeof CALENDAR_VISIBILITY];
