// =====================================================
// FILE: validators/artisan_category_links.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// ArtisanCategoryLinks SCHEMAS
// =====================================================

export const ArtisanCategoryLinksRowSchema = z.object({
  artisan_id: z.string(),
  category_id: z.string(),
  created_at: z.string(),
  id: z.string(),
  updated_at: z.string(),
});

export const ArtisanCategoryLinksInsertSchema = z.object({
  artisan_id: z.string(),
  category_id: z.string(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  updated_at: z.string().optional(),
});

export const ArtisanCategoryLinksUpdateSchema = z.object({
  artisan_id: z.string().optional(),
  category_id: z.string().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  updated_at: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ArtisanCategoryLinksRowInput = z.infer<typeof ArtisanCategoryLinksRowSchema>;
export type ArtisanCategoryLinksInsertInput = z.infer<typeof ArtisanCategoryLinksInsertSchema>;
export type ArtisanCategoryLinksUpdateInput = z.infer<typeof ArtisanCategoryLinksUpdateSchema>;
