// =====================================================
// FILE: validators/acid_test_answers.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// AcidTestAnswers SCHEMAS
// =====================================================

export const AcidTestAnswersRowSchema = z.object({
  acid_test_answers_id: z.string(),
  ally_tier_price: z.number().nullable(),
  answer_text: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  indicates_nd: z.boolean().nullable(),
  order_index: z.number().nullable(),
  persona_contribution: z.any().nullable(),
  question_id: z.string(),
  score_value: z.number().nullable(),
  updated_at: z.string().nullable(),
});

export const AcidTestAnswersInsertSchema = z.object({
  acid_test_answers_id: z.string().optional(),
  ally_tier_price: z.number().nullable().optional(),
  answer_text: z.string(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  indicates_nd: z.boolean().nullable().optional(),
  order_index: z.number().nullable().optional(),
  persona_contribution: z.any().nullable().optional(),
  question_id: z.string(),
  score_value: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const AcidTestAnswersUpdateSchema = z.object({
  acid_test_answers_id: z.string().optional(),
  ally_tier_price: z.number().nullable().optional(),
  answer_text: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  indicates_nd: z.boolean().nullable().optional(),
  order_index: z.number().nullable().optional(),
  persona_contribution: z.any().nullable().optional(),
  question_id: z.string().optional(),
  score_value: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AcidTestAnswersRowInput = z.infer<typeof AcidTestAnswersRowSchema>;
export type AcidTestAnswersInsertInput = z.infer<typeof AcidTestAnswersInsertSchema>;
export type AcidTestAnswersUpdateInput = z.infer<typeof AcidTestAnswersUpdateSchema>;
