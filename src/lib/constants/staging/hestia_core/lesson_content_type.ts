// =====================================================
// FILE: constants/lesson_content_type.ts
// GENERATED: 2026-04-05T19:46:33.298Z
// SOURCE: Constants.public.Enums.lesson_content_type
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
