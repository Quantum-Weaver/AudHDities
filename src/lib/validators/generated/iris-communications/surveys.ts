// =====================================================
// FILE: validators/surveys.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Surveys SCHEMAS
// =====================================================

export const SurveysRowSchema = z.object({
  category: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  display_order: z.number(),
  icon_url: z.string().nullable(),
  id: z.string(),
  is_anonymous: z.boolean(),
  is_public_results: z.boolean(),
  name: z.string(),
  questions: z.any().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  survey_type: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const SurveysInsertSchema = z.object({
  category: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_anonymous: z.boolean().optional(),
  is_public_results: z.boolean().optional(),
  name: z.string(),
  questions: z.any().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  survey_type: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const SurveysUpdateSchema = z.object({
  category: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_anonymous: z.boolean().optional(),
  is_public_results: z.boolean().optional(),
  name: z.string().optional(),
  questions: z.any().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  survey_type: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SurveysRowInput = z.infer<typeof SurveysRowSchema>;
export type SurveysInsertInput = z.infer<typeof SurveysInsertSchema>;
export type SurveysUpdateInput = z.infer<typeof SurveysUpdateSchema>;
