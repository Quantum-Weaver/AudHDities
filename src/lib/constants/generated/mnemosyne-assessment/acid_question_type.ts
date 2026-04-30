// =====================================================
// FILE: constants/generated/mnemosyne-assessment/acid_question_type.ts
// GENERATED: 2026-04-30T04:17:48.769Z
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
