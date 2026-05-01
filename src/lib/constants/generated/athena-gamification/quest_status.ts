// =====================================================
// FILE: constants/generated/athena-gamification/quest_status.ts
// GENERATED: 2026-05-01T15:32:00.102Z
// SOURCE: Constants.public.Enums.quest_status
// VALUES: 5 entries
// =====================================================

export const QUEST_STATUS = {
  LOCKED: 'locked',
  AVAILABLE: 'available',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  MASTERED: 'mastered',
} as const;

export type QuestStatus = typeof QUEST_STATUS[keyof typeof QUEST_STATUS];
