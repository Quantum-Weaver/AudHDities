// =====================================================
// FILE: validators/generated/hermes-social/creative_categories.ts
// GENERATED: 2026-04-15T19:06:11.553Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// CreativeCategories SCHEMAS
// =====================================================

export const CreativeCategoriesRowSchema = z.object({
  color: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  display_order: z.number().nullable(),
  icon: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  name: z.string(),
  parent_id: z.string().nullable(),
  slug: z.string(),
  updated_at: z.string().nullable(),
});

export const CreativeCategoriesInsertSchema = z.object({
  color: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().nullable().optional(),
  icon: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string().optional(),
  parent_id: z.string().nullable().optional(),
  slug: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

export const CreativeCategoriesUpdateSchema = z.object({
  color: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().nullable().optional(),
  icon: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string().optional(),
  parent_id: z.string().nullable().optional(),
  slug: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CreativeCategoriesRowInput = z.infer<typeof CreativeCategoriesRowSchema>;
export type CreativeCategoriesInsertInput = z.infer<typeof CreativeCategoriesInsertSchema>;
export type CreativeCategoriesUpdateInput = z.infer<typeof CreativeCategoriesUpdateSchema>;
