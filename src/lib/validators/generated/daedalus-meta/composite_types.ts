// =====================================================
// FILE: validators/composite_types.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// CompositeTypes SCHEMAS
// =====================================================

export const CompositeTypesRowSchema = z.object({
  archived_at: z.string().nullable(),
  attributes: z.any().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  last_seen_at: z.string().nullable(),
  log: z.any(),
  name: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  used_by: z.any().nullable(),
});

export const CompositeTypesInsertSchema = z.object({
  archived_at: z.string().nullable().optional(),
  attributes: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_seen_at: z.string().nullable().optional(),
  log: z.any().optional(),
  name: z.string(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  used_by: z.any().nullable().optional(),
});

export const CompositeTypesUpdateSchema = z.object({
  archived_at: z.string().nullable().optional(),
  attributes: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_seen_at: z.string().nullable().optional(),
  log: z.any().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  used_by: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CompositeTypesRowInput = z.infer<typeof CompositeTypesRowSchema>;
export type CompositeTypesInsertInput = z.infer<typeof CompositeTypesInsertSchema>;
export type CompositeTypesUpdateInput = z.infer<typeof CompositeTypesUpdateSchema>;
