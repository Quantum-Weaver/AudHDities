// =====================================================
// FILE: validators/assessment_questions.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// AssessmentQuestions SCHEMAS
// =====================================================

export const AssessmentQuestionsRowSchema = z.object({
  category: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  display_order: z.number(),
  id: z.string(),
  is_required: z.boolean(),
  labels_high: z.string().nullable(),
  labels_low: z.string().nullable(),
  options: z.any().nullable(),
  question_text: z.string(),
  question_type: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const AssessmentQuestionsInsertSchema = z.object({
  category: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  id: z.string().optional(),
  is_required: z.boolean().optional(),
  labels_high: z.string().nullable().optional(),
  labels_low: z.string().nullable().optional(),
  options: z.any().nullable().optional(),
  question_text: z.string(),
  question_type: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const AssessmentQuestionsUpdateSchema = z.object({
  category: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  id: z.string().optional(),
  is_required: z.boolean().optional(),
  labels_high: z.string().nullable().optional(),
  labels_low: z.string().nullable().optional(),
  options: z.any().nullable().optional(),
  question_text: z.string().optional(),
  question_type: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AssessmentQuestionsRowInput = z.infer<typeof AssessmentQuestionsRowSchema>;
export type AssessmentQuestionsInsertInput = z.infer<typeof AssessmentQuestionsInsertSchema>;
export type AssessmentQuestionsUpdateInput = z.infer<typeof AssessmentQuestionsUpdateSchema>;
