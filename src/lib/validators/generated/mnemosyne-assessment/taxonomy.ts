// =====================================================
// FILE: validators/taxonomy.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Taxonomy SCHEMAS
// =====================================================

export const TaxonomyRowSchema = z.object({
  class_id: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  domain_id: z.string().nullable(),
  emoji: z.string().nullable(),
  family_id: z.string().nullable(),
  genus_id: z.string().nullable(),
  id: z.string(),
  is_primary: z.boolean().nullable(),
  keyword_id: z.string().nullable(),
  kingdom_id: z.string().nullable(),
  name: z.string().nullable(),
  order_id: z.string().nullable(),
  phylum_id: z.string().nullable(),
  species_id: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const TaxonomyInsertSchema = z.object({
  class_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  domain_id: z.string().nullable().optional(),
  emoji: z.string().nullable().optional(),
  family_id: z.string().nullable().optional(),
  genus_id: z.string().nullable().optional(),
  id: z.string().optional(),
  is_primary: z.boolean().nullable().optional(),
  keyword_id: z.string().nullable().optional(),
  kingdom_id: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  order_id: z.string().nullable().optional(),
  phylum_id: z.string().nullable().optional(),
  species_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const TaxonomyUpdateSchema = z.object({
  class_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  domain_id: z.string().nullable().optional(),
  emoji: z.string().nullable().optional(),
  family_id: z.string().nullable().optional(),
  genus_id: z.string().nullable().optional(),
  id: z.string().optional(),
  is_primary: z.boolean().nullable().optional(),
  keyword_id: z.string().nullable().optional(),
  kingdom_id: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  order_id: z.string().nullable().optional(),
  phylum_id: z.string().nullable().optional(),
  species_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type TaxonomyRowInput = z.infer<typeof TaxonomyRowSchema>;
export type TaxonomyInsertInput = z.infer<typeof TaxonomyInsertSchema>;
export type TaxonomyUpdateInput = z.infer<typeof TaxonomyUpdateSchema>;
