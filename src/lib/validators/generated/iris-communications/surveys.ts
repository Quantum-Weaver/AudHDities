// =====================================================
// FILE: validators/generated/iris-communications/surveys.ts
// GENERATED: 2026-04-17T01:35:45.348Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { COUNCIL_HOUSE } from '@/lib/constants/generated/iris-communications/council_house';

// =====================================================
// Surveys SCHEMAS
// =====================================================

export const SurveysRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string(),
  description: z.string().nullable(),
  expires_at: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  questions: z.any(),
  response_count: z.number().nullable(),
  starts_at: z.string().nullable(),
  target_house: z.enum(Object.values(COUNCIL_HOUSE)).nullable(),
  title: z.string(),
  updated_at: z.string().nullable(),
});

export const SurveysInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string(),
  description: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  questions: z.any(),
  response_count: z.number().nullable().optional(),
  starts_at: z.string().nullable().optional(),
  target_house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  title: z.string(),
  updated_at: z.string().nullable().optional(),
});

export const SurveysUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().optional(),
  description: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  questions: z.any().optional(),
  response_count: z.number().nullable().optional(),
  starts_at: z.string().nullable().optional(),
  target_house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  title: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SurveysRowInput = z.infer<typeof SurveysRowSchema>;
export type SurveysInsertInput = z.infer<typeof SurveysInsertSchema>;
export type SurveysUpdateInput = z.infer<typeof SurveysUpdateSchema>;
