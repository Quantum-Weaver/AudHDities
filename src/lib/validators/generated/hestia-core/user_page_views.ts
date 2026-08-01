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
  deity_domain: z.string().nullable(),
  first_visited_at: z.string(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  last_visited_at: z.string(),
  page_name: z.string().nullable(),
  page_path: z.string(),
  updated_at: z.string(),
  user_id: z.string(),
  visit_count: z.number(),
});

export const UserPageViewsInsertSchema = z.object({
  created_at: z.string().optional(),
  deity_domain: z.string().nullable().optional(),
  first_visited_at: z.string().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  last_visited_at: z.string().optional(),
  page_name: z.string().nullable().optional(),
  page_path: z.string(),
  updated_at: z.string().optional(),
  user_id: z.string(),
  visit_count: z.number().optional(),
});

export const UserPageViewsUpdateSchema = z.object({
  created_at: z.string().optional(),
  deity_domain: z.string().nullable().optional(),
  first_visited_at: z.string().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  last_visited_at: z.string().optional(),
  page_name: z.string().nullable().optional(),
  page_path: z.string().optional(),
  updated_at: z.string().optional(),
  user_id: z.string().optional(),
  visit_count: z.number().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type UserPageViewsRowInput = z.infer<typeof UserPageViewsRowSchema>;
export type UserPageViewsInsertInput = z.infer<typeof UserPageViewsInsertSchema>;
export type UserPageViewsUpdateInput = z.infer<typeof UserPageViewsUpdateSchema>;
