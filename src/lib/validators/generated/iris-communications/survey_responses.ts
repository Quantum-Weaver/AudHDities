// =====================================================
// FILE: validators/survey_responses.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// SurveyResponses SCHEMAS
// =====================================================

export const SurveyResponsesRowSchema = z.object({
  answers: z.any().nullable(),
  created_at: z.string(),
  created_by: z.string(),
  id: z.string(),
  is_anonymous: z.boolean(),
  notes: z.string().nullable(),
  status: z.string(),
  submitted_at: z.string().nullable(),
  survey_id: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const SurveyResponsesInsertSchema = z.object({
  answers: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string(),
  id: z.string().optional(),
  is_anonymous: z.boolean().optional(),
  notes: z.string().nullable().optional(),
  status: z.string().optional(),
  submitted_at: z.string().nullable().optional(),
  survey_id: z.string(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const SurveyResponsesUpdateSchema = z.object({
  answers: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  id: z.string().optional(),
  is_anonymous: z.boolean().optional(),
  notes: z.string().nullable().optional(),
  status: z.string().optional(),
  submitted_at: z.string().nullable().optional(),
  survey_id: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SurveyResponsesRowInput = z.infer<typeof SurveyResponsesRowSchema>;
export type SurveyResponsesInsertInput = z.infer<typeof SurveyResponsesInsertSchema>;
export type SurveyResponsesUpdateInput = z.infer<typeof SurveyResponsesUpdateSchema>;
