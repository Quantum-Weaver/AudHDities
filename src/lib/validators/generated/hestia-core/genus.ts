// =====================================================
// FILE: validators/genus.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Genus SCHEMAS
// =====================================================

export const GenusRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  family_id: z.string().nullable(),
  id: z.string(),
  keyword_id: z.string().nullable(),
  name: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const GenusInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  family_id: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  name: z.string(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const GenusUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  family_id: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type GenusRowInput = z.infer<typeof GenusRowSchema>;
export type GenusInsertInput = z.infer<typeof GenusInsertSchema>;
export type GenusUpdateInput = z.infer<typeof GenusUpdateSchema>;
