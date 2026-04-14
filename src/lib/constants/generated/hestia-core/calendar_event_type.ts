// =====================================================
// FILE: constants/generated/hestia-core/calendar_event_type.ts
// GENERATED: 2026-04-14T20:18:57.635Z
// SOURCE: Constants.public.Enums.calendar_event_type
// VALUES: 5 entries
// =====================================================

export const CALENDAR_EVENT_TYPE = {
  HOLIDAY: 'holiday',
  RITUAL: 'ritual',
  MILESTONE: 'milestone',
  MAINTENANCE: 'maintenance',
  RELEASE: 'release',
} as const;

export type CalendarEventType = typeof CALENDAR_EVENT_TYPE[keyof typeof CALENDAR_EVENT_TYPE];
