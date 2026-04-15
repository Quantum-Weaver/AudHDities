// =====================================================
// FILE: constants/generated/athena-gamification/difficulty_level.ts
// GENERATED: 2026-04-15T18:28:45.894Z
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
