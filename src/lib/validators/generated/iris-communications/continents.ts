// =====================================================
// FILE: validators/continents.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Continents SCHEMAS
// =====================================================

export const ContinentsRowSchema = z.object({
  code: z.string(),
  continents_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  name: z.string(),
  name_localized: z.any().nullable(),
  population_estimate: z.number().nullable(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const ContinentsInsertSchema = z.object({
  code: z.string(),
  continents_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  name: z.string(),
  name_localized: z.any().nullable().optional(),
  population_estimate: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ContinentsUpdateSchema = z.object({
  code: z.string().optional(),
  continents_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  name: z.string().optional(),
  name_localized: z.any().nullable().optional(),
  population_estimate: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ContinentsRowInput = z.infer<typeof ContinentsRowSchema>;
export type ContinentsInsertInput = z.infer<typeof ContinentsInsertSchema>;
export type ContinentsUpdateInput = z.infer<typeof ContinentsUpdateSchema>;
