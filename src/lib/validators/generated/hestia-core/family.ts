// =====================================================
// FILE: validators/family.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Family SCHEMAS
// =====================================================

export const FamilyRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  keyword_id: z.string().nullable(),
  name: z.string(),
  order_id: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const FamilyInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  name: z.string(),
  order_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const FamilyUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  name: z.string().optional(),
  order_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type FamilyRowInput = z.infer<typeof FamilyRowSchema>;
export type FamilyInsertInput = z.infer<typeof FamilyInsertSchema>;
export type FamilyUpdateInput = z.infer<typeof FamilyUpdateSchema>;
