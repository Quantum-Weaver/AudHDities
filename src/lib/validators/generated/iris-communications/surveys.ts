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
  created_at: z.string().nullable(),
  created_by: z.string(),
  description: z.string().nullable(),
  expires_at: z.string().nullable(),
  is_active: z.boolean().nullable(),
  questions: z.any(),
  response_count: z.number().nullable(),
  slug: z.string().nullable(),
  starts_at: z.string().nullable(),
  surveys_id: z.string(),
  target_house: z.enum(ENUM_VALUES.councilHouse).nullable(),
  title: z.string(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const SurveysInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string(),
  description: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  questions: z.any(),
  response_count: z.number().nullable().optional(),
  slug: z.string().nullable().optional(),
  starts_at: z.string().nullable().optional(),
  surveys_id: z.string().optional(),
  target_house: z.enum(ENUM_VALUES.councilHouse).nullable().optional(),
  title: z.string(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const SurveysUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().optional(),
  description: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  questions: z.any().optional(),
  response_count: z.number().nullable().optional(),
  slug: z.string().nullable().optional(),
  starts_at: z.string().nullable().optional(),
  surveys_id: z.string().optional(),
  target_house: z.enum(ENUM_VALUES.councilHouse).nullable().optional(),
  title: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SurveysRowInput = z.infer<typeof SurveysRowSchema>;
export type SurveysInsertInput = z.infer<typeof SurveysInsertSchema>;
export type SurveysUpdateInput = z.infer<typeof SurveysUpdateSchema>;
