// =====================================================
// FILE: validators/generated/hestia-core/creator_category_links.ts
// GENERATED: 2026-04-14T19:39:30.078Z
// SOURCE: database.types.ts
// =====================================================

// =====================================================
// CreatorCategoryLinks SCHEMAS
// =====================================================

export const CreatorCategoryLinksRowSchema = z.object({
  category_id: z.string();
  "created_at": "z.string().nullable()";
  created_by: z.string().nullable();
  creator_id: z.string();
  id: z.string();
});

export const CreatorCategoryLinksInsertSchema = z.object({
  category_id: z.string().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  creator_id: z.string().optional();
  id: z.string().optional();
});

export const CreatorCategoryLinksUpdateSchema = z.object({
  category_id: z.string().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  creator_id: z.string().optional();
  id: z.string().optional();
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CreatorCategoryLinksRowInput = z.infer<typeof CreatorCategoryLinksRowSchema>;
export type CreatorCategoryLinksInsertInput = z.infer<typeof CreatorCategoryLinksInsertSchema>;
export type CreatorCategoryLinksUpdateInput = z.infer<typeof CreatorCategoryLinksUpdateSchema>;
