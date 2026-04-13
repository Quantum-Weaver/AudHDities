// =====================================================
// FILE: constants/generated/athena-gamification/difficulty_level.ts
// GENERATED: 2026-04-13T21:55:48.476Z
// SOURCE: Constants.public.Enums.difficulty_level
// =====================================================

export const DIFFICULTY_LEVEL = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  MASTER: 'master',
} as const;

export type DifficultyLevel = typeof DIFFICULTY_LEVEL[keyof typeof DIFFICULTY_LEVEL];