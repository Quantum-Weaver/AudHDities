// =====================================================
// FILE: validators/acid_test_results.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// AcidTestResults SCHEMAS
// =====================================================

export const AcidTestResultsRowSchema = z.object({
  answers: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  persona_description: z.string().nullable(),
  persona_label: z.enum(ENUM_VALUES.acidPersona).nullable(),
  recommendations: z.any().nullable(),
  scores_by_category: z.any().nullable(),
  suggested_tier: z.enum(ENUM_VALUES.userTier).nullable(),
  total_score: z.number().nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
});

export const AcidTestResultsInsertSchema = z.object({
  answers: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  persona_description: z.string().nullable().optional(),
  persona_label: z.enum(ENUM_VALUES.acidPersona).nullable().optional(),
  recommendations: z.any().nullable().optional(),
  scores_by_category: z.any().nullable().optional(),
  suggested_tier: z.enum(ENUM_VALUES.userTier).nullable().optional(),
  total_score: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

export const AcidTestResultsUpdateSchema = z.object({
  answers: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  persona_description: z.string().nullable().optional(),
  persona_label: z.enum(ENUM_VALUES.acidPersona).nullable().optional(),
  recommendations: z.any().nullable().optional(),
  scores_by_category: z.any().nullable().optional(),
  suggested_tier: z.enum(ENUM_VALUES.userTier).nullable().optional(),
  total_score: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AcidTestResultsRowInput = z.infer<typeof AcidTestResultsRowSchema>;
export type AcidTestResultsInsertInput = z.infer<typeof AcidTestResultsInsertSchema>;
export type AcidTestResultsUpdateInput = z.infer<typeof AcidTestResultsUpdateSchema>;
