// =====================================================
// FILE: validators/assessment_answers.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// AssessmentAnswers SCHEMAS
// =====================================================

export const AssessmentAnswersRowSchema = z.object({
  answer_value: z.any().nullable(),
  answered_at: z.string(),
  created_at: z.string(),
  created_by: z.string(),
  id: z.string(),
  notes: z.string().nullable(),
  question_id: z.string(),
  status: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const AssessmentAnswersInsertSchema = z.object({
  answer_value: z.any().nullable().optional(),
  answered_at: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  question_id: z.string(),
  status: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const AssessmentAnswersUpdateSchema = z.object({
  answer_value: z.any().nullable().optional(),
  answered_at: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  question_id: z.string().optional(),
  status: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AssessmentAnswersRowInput = z.infer<typeof AssessmentAnswersRowSchema>;
export type AssessmentAnswersInsertInput = z.infer<typeof AssessmentAnswersInsertSchema>;
export type AssessmentAnswersUpdateInput = z.infer<typeof AssessmentAnswersUpdateSchema>;
