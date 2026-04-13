// =====================================================
// FILE: validators/generated/taxonomy.ts
// GENERATED: 2026-04-13T15:29:50.989Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Taxonomy SCHEMAS
// =====================================================

export const TaxonomyRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  domain: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  level: z.number().nullable(),
  name: z.string(),
  node_type: z.enum(Object.values(TaxonomyNodeType)),
  parent_id: z.string().nullable(),
  path: z.string(),
  slug: z.string(),
  updated_at: z.string().nullable(),
});

export const TaxonomyInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  domain: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  level: z.number().nullable().optional(),
  name: z.string().optional(),
  node_type: z.enum(Object.values(TaxonomyNodeType)).optional(),
  parent_id: z.string().nullable().optional(),
  path: z.string().optional(),
  slug: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

export const TaxonomyUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  domain: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  level: z.number().nullable().optional(),
  name: z.string().optional(),
  node_type: z.enum(Object.values(TaxonomyNodeType)).optional(),
  parent_id: z.string().nullable().optional(),
  path: z.string().optional(),
  slug: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type TaxonomyRowInput = z.infer<typeof TaxonomyRowSchema>;
export type TaxonomyInsertInput = z.infer<typeof TaxonomyInsertSchema>;
export type TaxonomyUpdateInput = z.infer<typeof TaxonomyUpdateSchema>;
