// =====================================================
// FILE: constants/timeline_event_type.ts
// GENERATED: 2026-04-05T19:46:33.405Z
// SOURCE: Constants.public.Enums.timeline_event_type
// =====================================================

export const TIMELINE_EVENT_TYPE = {
  QUEST_COMPLETED: 'quest_completed',
  BADGE_EARNED: 'badge_earned',
  PATH_COMPLETED: 'path_completed',
  MILESTONE_REACHED: 'milestone_reached',
  HOUSE_JOINED: 'house_joined',
  RITUAL_PERFORMED: 'ritual_performed',
  SCENE_WITNESSED: 'scene_witnessed',
} as const;

export type TimelineEventType = typeof TIMELINE_EVENT_TYPE[keyof typeof TIMELINE_EVENT_TYPE];
