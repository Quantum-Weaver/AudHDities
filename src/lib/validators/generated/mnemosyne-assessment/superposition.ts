// =====================================================
// FILE: validators/generated/mnemosyne-assessment/superposition.ts
// GENERATED: 2026-04-17T01:35:45.345Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { SUPERPOSITION_STATUS } from '@/lib/constants/generated/mnemosyne-assessment/superposition_status';

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
  status: z.enum(Object.values(SUPERPOSITION_STATUS)).nullable(),
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
  status: z.enum(Object.values(SUPERPOSITION_STATUS)).nullable().optional(),
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
  status: z.enum(Object.values(SUPERPOSITION_STATUS)).nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SuperpositionRowInput = z.infer<typeof SuperpositionRowSchema>;
export type SuperpositionInsertInput = z.infer<typeof SuperpositionInsertSchema>;
export type SuperpositionUpdateInput = z.infer<typeof SuperpositionUpdateSchema>;
