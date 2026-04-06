// =====================================================
// FILE: constants/quest_status.ts
// GENERATED: 2026-04-05T21:48:03.761Z
// SOURCE: Constants.public.Enums.quest_status
// =====================================================

export const QUEST_STATUS = {
  LOCKED: 'locked',
  AVAILABLE: 'available',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  MASTERED: 'mastered',
} as const;

export type QuestStatus = typeof QUEST_STATUS[keyof typeof QUEST_STATUS];
