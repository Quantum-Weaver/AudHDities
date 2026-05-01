// =====================================================
// FILE: constants/generated/mnemosyne-assessment/acid_question_type.ts
// GENERATED: 2026-05-01T15:32:00.026Z
// SOURCE: Constants.public.Enums.acid_question_type
// VALUES: 5 entries
// =====================================================

export const ACID_QUESTION_TYPE = {
  MULTIPLE_CHOICE: 'multiple_choice',
  SLIDER: 'slider',
  CHECKBOX: 'checkbox',
  SCALE: 'scale',
  TEXT: 'text',
} as const;

export type AcidQuestionType = typeof ACID_QUESTION_TYPE[keyof typeof ACID_QUESTION_TYPE];
