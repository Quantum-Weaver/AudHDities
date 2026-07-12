// =====================================================
// FILE: validators/categories.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Categories SCHEMAS
// =====================================================

export const CategoriesRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  display_order: z.number(),
  icon_emoji: z.string().nullable(),
  icon_url: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const CategoriesInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_emoji: z.string().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const CategoriesUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_emoji: z.string().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CategoriesRowInput = z.infer<typeof CategoriesRowSchema>;
export type CategoriesInsertInput = z.infer<typeof CategoriesInsertSchema>;
export type CategoriesUpdateInput = z.infer<typeof CategoriesUpdateSchema>;
