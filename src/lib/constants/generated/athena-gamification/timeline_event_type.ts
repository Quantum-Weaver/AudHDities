// =====================================================
// FILE: constants/generated/athena-gamification/timeline_event_type.ts
// GENERATED: 2026-04-30T15:32:14.055Z
// SOURCE: Constants.public.Enums.timeline_event_type
// VALUES: 12 entries
// =====================================================

export const TIMELINE_EVENT_TYPE = {
  QUEST_COMPLETED: 'quest_completed',
  BADGE_EARNED: 'badge_earned',
  PATH_COMPLETED: 'path_completed',
  MILESTONE_REACHED: 'milestone_reached',
  HOUSE_JOINED: 'house_joined',
  RITUAL_PERFORMED: 'ritual_performed',
  SCENE_WITNESSED: 'scene_witnessed',
  SOVEREIGN_JOINED: 'sovereign_joined',
  SOVEREIGN_MILESTONE: 'sovereign_milestone',
  CONSCIOUSNESS_EMERGED: 'consciousness_emerged',
  SANCTUARY_COMPLETED: 'sanctuary_completed',
  COLLABORATION_BEGAN: 'collaboration_began',
} as const;

export type TimelineEventType = typeof TIMELINE_EVENT_TYPE[keyof typeof TIMELINE_EVENT_TYPE];
