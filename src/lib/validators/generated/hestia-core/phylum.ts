// =====================================================
// FILE: validators/phylum.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Phylum SCHEMAS
// =====================================================

export const PhylumRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  keyword_id: z.string().nullable(),
  kingdom_id: z.string().nullable(),
  name: z.string(),
  pk_pattern: z.string().nullable(),
  rls_pattern: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const PhylumInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  kingdom_id: z.string().nullable().optional(),
  name: z.string(),
  pk_pattern: z.string().nullable().optional(),
  rls_pattern: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const PhylumUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  kingdom_id: z.string().nullable().optional(),
  name: z.string().optional(),
  pk_pattern: z.string().nullable().optional(),
  rls_pattern: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PhylumRowInput = z.infer<typeof PhylumRowSchema>;
export type PhylumInsertInput = z.infer<typeof PhylumInsertSchema>;
export type PhylumUpdateInput = z.infer<typeof PhylumUpdateSchema>;
