// =====================================================
// FILE: validators/creator_category_links.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// CreatorCategoryLinks SCHEMAS
// =====================================================

export const CreatorCategoryLinksRowSchema = z.object({
  category_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  creator_category_links_id: z.string(),
  creator_id: z.string(),
  updated_at: z.string().nullable(),
});

export const CreatorCategoryLinksInsertSchema = z.object({
  category_id: z.string(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_category_links_id: z.string().optional(),
  creator_id: z.string(),
  updated_at: z.string().nullable().optional(),
});

export const CreatorCategoryLinksUpdateSchema = z.object({
  category_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_category_links_id: z.string().optional(),
  creator_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CreatorCategoryLinksRowInput = z.infer<typeof CreatorCategoryLinksRowSchema>;
export type CreatorCategoryLinksInsertInput = z.infer<typeof CreatorCategoryLinksInsertSchema>;
export type CreatorCategoryLinksUpdateInput = z.infer<typeof CreatorCategoryLinksUpdateSchema>;
