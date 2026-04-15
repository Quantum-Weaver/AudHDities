// =====================================================
// FILE: validators/generated/mnemosyne-assessment/acid_test_results.ts
// GENERATED: 2026-04-15T18:11:44.250Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { ACID_PERSONA } from '@/lib/constants/generated/mnemosyne-assessment/acid_persona';
import { USER_TIER } from '@/lib/constants/generated/mnemosyne-assessment/user_tier';

// =====================================================
// AcidTestResults SCHEMAS
// =====================================================

export const AcidTestResultsRowSchema = z.object({
  answers: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  persona_description: z.string().nullable(),
  persona_label: z.enum(Object.values(ACID_PERSONA)).nullable(),
  recommendations: z.any().nullable(),
  scores_by_category: z.any().nullable(),
  suggested_tier: z.enum(Object.values(USER_TIER)).nullable(),
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
  persona_label: z.enum(Object.values(ACID_PERSONA)).nullable().optional(),
  recommendations: z.any().nullable().optional(),
  scores_by_category: z.any().nullable().optional(),
  suggested_tier: z.enum(Object.values(USER_TIER)).nullable().optional(),
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
  persona_label: z.enum(Object.values(ACID_PERSONA)).nullable().optional(),
  recommendations: z.any().nullable().optional(),
  scores_by_category: z.any().nullable().optional(),
  suggested_tier: z.enum(Object.values(USER_TIER)).nullable().optional(),
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
