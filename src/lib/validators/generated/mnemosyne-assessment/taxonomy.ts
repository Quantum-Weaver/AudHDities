// =====================================================
// FILE: validators/taxonomy.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Taxonomy SCHEMAS
// =====================================================

export const TaxonomyRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  domain: z.string().nullable(),
  is_active: z.boolean().nullable(),
  level: z.number().nullable(),
  name: z.string(),
  node_type: z.enum(ENUM_VALUES.taxonomyNodeType),
  parent_id: z.string().nullable(),
  path: z.string(),
  slug: z.string(),
  taxonomy_id: z.string(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const TaxonomyInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  domain: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  level: z.number().nullable().optional(),
  name: z.string(),
  node_type: z.enum(ENUM_VALUES.taxonomyNodeType).optional(),
  parent_id: z.string().nullable().optional(),
  path: z.string(),
  slug: z.string(),
  taxonomy_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const TaxonomyUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  domain: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  level: z.number().nullable().optional(),
  name: z.string().optional(),
  node_type: z.enum(ENUM_VALUES.taxonomyNodeType).optional(),
  parent_id: z.string().nullable().optional(),
  path: z.string().optional(),
  slug: z.string().optional(),
  taxonomy_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type TaxonomyRowInput = z.infer<typeof TaxonomyRowSchema>;
export type TaxonomyInsertInput = z.infer<typeof TaxonomyInsertSchema>;
export type TaxonomyUpdateInput = z.infer<typeof TaxonomyUpdateSchema>;
