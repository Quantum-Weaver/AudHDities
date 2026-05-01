// =====================================================
// FILE: validators/mythology.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Mythology SCHEMAS
// =====================================================

export const MythologyRowSchema = z.object({
  author_id: z.string(),
  content: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  house: z.enum(ENUM_VALUES.councilHouse).nullable(),
  is_published: z.boolean().nullable(),
  mythology_id: z.string(),
  order_index: z.number().nullable(),
  series_id: z.string().nullable(),
  slug: z.string(),
  title: z.string(),
  type: z.enum(ENUM_VALUES.mythType),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const MythologyInsertSchema = z.object({
  author_id: z.string(),
  content: z.string(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  house: z.enum(ENUM_VALUES.councilHouse).nullable().optional(),
  is_published: z.boolean().nullable().optional(),
  mythology_id: z.string().optional(),
  order_index: z.number().nullable().optional(),
  series_id: z.string().nullable().optional(),
  slug: z.string(),
  title: z.string(),
  type: z.enum(ENUM_VALUES.mythType),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const MythologyUpdateSchema = z.object({
  author_id: z.string().optional(),
  content: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  house: z.enum(ENUM_VALUES.councilHouse).nullable().optional(),
  is_published: z.boolean().nullable().optional(),
  mythology_id: z.string().optional(),
  order_index: z.number().nullable().optional(),
  series_id: z.string().nullable().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  type: z.enum(ENUM_VALUES.mythType).optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type MythologyRowInput = z.infer<typeof MythologyRowSchema>;
export type MythologyInsertInput = z.infer<typeof MythologyInsertSchema>;
export type MythologyUpdateInput = z.infer<typeof MythologyUpdateSchema>;
