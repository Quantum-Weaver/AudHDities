// =====================================================
// FILE: validators/survey_responses.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// SurveyResponses SCHEMAS
// =====================================================

export const SurveyResponsesRowSchema = z.object({
  answers: z.any(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  duration_seconds: z.number().nullable(),
  id: z.string(),
  ip_address: z.any(),
  survey_id: z.string(),
  user_agent: z.string().nullable(),
  user_id: z.string(),
});

export const SurveyResponsesInsertSchema = z.object({
  answers: z.any().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  duration_seconds: z.number().nullable().optional(),
  id: z.string().optional(),
  ip_address: z.any().optional(),
  survey_id: z.string().optional(),
  user_agent: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SurveyResponsesRowInput = z.infer<typeof SurveyResponsesRowSchema>;
export type SurveyResponsesInsertInput = z.infer<typeof SurveyResponsesInsertSchema>;
