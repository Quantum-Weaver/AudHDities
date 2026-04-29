// =====================================================
// FILE: validators/superposition.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Superposition SCHEMAS
// =====================================================

export const SuperpositionRowSchema = z.object({
  collapse_count: z.number().nullable(),
  concept_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  observer_count: z.number().nullable(),
  possible_meanings: z.any(),
  probability_distribution: z.any(),
  status: z.enum(ENUM_VALUES.superpositionStatus).nullable(),
  updated_at: z.string().nullable(),
});

export const SuperpositionInsertSchema = z.object({
  collapse_count: z.number().nullable().optional(),
  concept_id: z.string(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  observer_count: z.number().nullable().optional(),
  possible_meanings: z.any(),
  probability_distribution: z.any(),
  status: z.enum(ENUM_VALUES.superpositionStatus).nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const SuperpositionUpdateSchema = z.object({
  collapse_count: z.number().nullable().optional(),
  concept_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  observer_count: z.number().nullable().optional(),
  possible_meanings: z.any().optional(),
  probability_distribution: z.any().optional(),
  status: z.enum(ENUM_VALUES.superpositionStatus).nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SuperpositionRowInput = z.infer<typeof SuperpositionRowSchema>;
export type SuperpositionInsertInput = z.infer<typeof SuperpositionInsertSchema>;
export type SuperpositionUpdateInput = z.infer<typeof SuperpositionUpdateSchema>;
