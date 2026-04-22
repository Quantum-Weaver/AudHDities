// =====================================================
// FILE: constants/generated/athena-gamification/quest_status.ts
// GENERATED: 2026-04-22T18:15:11.395Z
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
