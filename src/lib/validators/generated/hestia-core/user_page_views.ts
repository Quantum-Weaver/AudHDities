// =====================================================
// FILE: validators/user_page_views.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// UserPageViews SCHEMAS
// =====================================================

export const UserPageViewsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  first_viewed_at: z.string().nullable(),
  id: z.string(),
  last_viewed_at: z.string().nullable(),
  page_path: z.string(),
  user_id: z.string(),
  view_count: z.number().nullable(),
});

export const UserPageViewsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  first_viewed_at: z.string().nullable().optional(),
  id: z.string().optional(),
  last_viewed_at: z.string().nullable().optional(),
  page_path: z.string(),
  user_id: z.string(),
  view_count: z.number().nullable().optional(),
});

export const UserPageViewsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  first_viewed_at: z.string().nullable().optional(),
  id: z.string().optional(),
  last_viewed_at: z.string().nullable().optional(),
  page_path: z.string().optional(),
  user_id: z.string().optional(),
  view_count: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type UserPageViewsRowInput = z.infer<typeof UserPageViewsRowSchema>;
export type UserPageViewsInsertInput = z.infer<typeof UserPageViewsInsertSchema>;
export type UserPageViewsUpdateInput = z.infer<typeof UserPageViewsUpdateSchema>;
