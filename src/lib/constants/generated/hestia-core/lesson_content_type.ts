// =====================================================
// FILE: constants/hestia-core/lesson_content_type.ts
// GENERATED: 2026-04-13T16:36:33.085Z
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
