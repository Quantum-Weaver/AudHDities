// =====================================================
// FILE: constants/acid_question_type.ts
// GENERATED: 2026-04-05T18:12:44.905Z
// SOURCE: Constants.public.Enums.acid_question_type
// =====================================================

export const ACID_QUESTION_TYPE = {
  MULTIPLE_CHOICE: 'multiple_choice',
  SLIDER: 'slider',
  CHECKBOX: 'checkbox',
  SCALE: 'scale',
  TEXT: 'text',
} as const;

export type AcidQuestionType = typeof ACID_QUESTION_TYPE[keyof typeof ACID_QUESTION_TYPE];
