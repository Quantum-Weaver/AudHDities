// =====================================================
// FILE: validators/generated/mnemosyne-assessment/acid_test_questions.ts
// GENERATED: 2026-04-15T16:13:09.443Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// AcidTestQuestions SCHEMAS
// =====================================================

export const AcidTestQuestionsRowSchema = z.object({
  category: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  explanation: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  order_index: z.number().nullable(),
  question_text: z.string(),
  question_type: z.enum(Object.values(ACID_QUESTION_TYPE)),
  updated_at: z.string().nullable(),
  weight: z.number().nullable(),
});

export const AcidTestQuestionsInsertSchema = z.object({
  category: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  explanation: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  order_index: z.number().nullable().optional(),
  question_text: z.string().optional(),
  question_type: z.enum(Object.values(ACID_QUESTION_TYPE)).optional(),
  updated_at: z.string().nullable().optional(),
  weight: z.number().nullable().optional(),
});

export const AcidTestQuestionsUpdateSchema = z.object({
  category: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  explanation: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  order_index: z.number().nullable().optional(),
  question_text: z.string().optional(),
  question_type: z.enum(Object.values(ACID_QUESTION_TYPE)).optional(),
  updated_at: z.string().nullable().optional(),
  weight: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AcidTestQuestionsRowInput = z.infer<typeof AcidTestQuestionsRowSchema>;
export type AcidTestQuestionsInsertInput = z.infer<typeof AcidTestQuestionsInsertSchema>;
export type AcidTestQuestionsUpdateInput = z.infer<typeof AcidTestQuestionsUpdateSchema>;
