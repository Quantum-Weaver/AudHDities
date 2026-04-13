// =====================================================
// FILE: constants/athena-gamification/difficulty_level.ts
// GENERATED: 2026-04-13T01:15:57.353Z
// SOURCE: Constants.public.Enums.difficulty_level
// VALUES: 4 entries
// =====================================================

export const DIFFICULTY_LEVEL = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  MASTER: 'master',
} as const;

export type DifficultyLevel = typeof DIFFICULTY_LEVEL[keyof typeof DIFFICULTY_LEVEL];
