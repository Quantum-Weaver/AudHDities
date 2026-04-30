// =====================================================
// FILE: constants/generated/athena-gamification/lesson_content_type.ts
// GENERATED: 2026-04-30T04:17:48.921Z
// SOURCE: Constants.public.Enums.lesson_content_type
// VALUES: 6 entries
// =====================================================

export const LESSON_CONTENT_TYPE = {
  TEXT: 'text',
  VIDEO: 'video',
  AUDIO: 'audio',
  INTERACTIVE: 'interactive',
  QUIZ: 'quiz',
  EXERCISE: 'exercise',
} as const;

export type LessonContentType = typeof LESSON_CONTENT_TYPE[keyof typeof LESSON_CONTENT_TYPE];
