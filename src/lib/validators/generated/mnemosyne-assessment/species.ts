// =====================================================
// FILE: validators/species.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Species SCHEMAS
// =====================================================

export const SpeciesRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  data_type: z.string().nullable(),
  description: z.string().nullable(),
  family_id: z.string().nullable(),
  genus_id: z.string().nullable(),
  id: z.string(),
  keyword_id: z.string().nullable(),
  keyword_ids: z.any().nullable(),
  name: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const SpeciesInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  data_type: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  family_id: z.string().nullable().optional(),
  genus_id: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  keyword_ids: z.any().nullable().optional(),
  name: z.string(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const SpeciesUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  data_type: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  family_id: z.string().nullable().optional(),
  genus_id: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  keyword_ids: z.any().nullable().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SpeciesRowInput = z.infer<typeof SpeciesRowSchema>;
export type SpeciesInsertInput = z.infer<typeof SpeciesInsertSchema>;
export type SpeciesUpdateInput = z.infer<typeof SpeciesUpdateSchema>;
