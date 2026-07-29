// =====================================================
// FILE: validators/indexes.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Indexes SCHEMAS
// =====================================================

export const IndexesRowSchema = z.object({
  columns: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  definition: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  log: z.any(),
  name: z.string(),
  table_name: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const IndexesInsertSchema = z.object({
  columns: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  definition: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  log: z.any().optional(),
  name: z.string(),
  table_name: z.string(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const IndexesUpdateSchema = z.object({
  columns: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  definition: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  log: z.any().optional(),
  name: z.string().optional(),
  table_name: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type IndexesRowInput = z.infer<typeof IndexesRowSchema>;
export type IndexesInsertInput = z.infer<typeof IndexesInsertSchema>;
export type IndexesUpdateInput = z.infer<typeof IndexesUpdateSchema>;
