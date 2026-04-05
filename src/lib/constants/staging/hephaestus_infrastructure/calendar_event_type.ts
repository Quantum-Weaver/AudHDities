// =====================================================
// FILE: constants/calendar_event_type.ts
// GENERATED: 2026-04-05T19:46:33.240Z
// SOURCE: Constants.public.Enums.calendar_event_type
// =====================================================

export const CALENDAR_EVENT_TYPE = {
  HOLIDAY: 'holiday',
  RITUAL: 'ritual',
  MILESTONE: 'milestone',
  MAINTENANCE: 'maintenance',
  RELEASE: 'release',
} as const;

export type CalendarEventType = typeof CALENDAR_EVENT_TYPE[keyof typeof CALENDAR_EVENT_TYPE];
