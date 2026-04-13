// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/calendar_visibility.ts
// GENERATED: 2026-04-13T21:55:48.469Z
// SOURCE: Constants.public.Enums.calendar_visibility
// =====================================================

export const CALENDAR_VISIBILITY = {
  PUBLIC: 'public',
  HOUSE: 'house',
  ADMIN: 'admin',
} as const;

export type CalendarVisibility = typeof CALENDAR_VISIBILITY[keyof typeof CALENDAR_VISIBILITY];