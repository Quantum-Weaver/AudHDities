// =====================================================
// FILE: validators/generated/athena-gamification/mythology.ts
// GENERATED: 2026-04-15T19:06:11.570Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { COUNCIL_HOUSE } from '@/lib/constants/generated/athena-gamification/council_house';
import { MYTH_TYPE } from '@/lib/constants/generated/athena-gamification/myth_type';

// =====================================================
// Mythology SCHEMAS
// =====================================================

export const MythologyRowSchema = z.object({
  author_id: z.string(),
  content: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).nullable(),
  id: z.string(),
  is_published: z.boolean().nullable(),
  order_index: z.number().nullable(),
  series_id: z.string().nullable(),
  slug: z.string(),
  title: z.string(),
  type: z.enum(Object.values(MYTH_TYPE)),
  updated_at: z.string().nullable(),
});

export const MythologyInsertSchema = z.object({
  author_id: z.string().optional(),
  content: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  id: z.string().optional(),
  is_published: z.boolean().nullable().optional(),
  order_index: z.number().nullable().optional(),
  series_id: z.string().nullable().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  type: z.enum(Object.values(MYTH_TYPE)).optional(),
  updated_at: z.string().nullable().optional(),
});

export const MythologyUpdateSchema = z.object({
  author_id: z.string().optional(),
  content: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  id: z.string().optional(),
  is_published: z.boolean().nullable().optional(),
  order_index: z.number().nullable().optional(),
  series_id: z.string().nullable().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  type: z.enum(Object.values(MYTH_TYPE)).optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type MythologyRowInput = z.infer<typeof MythologyRowSchema>;
export type MythologyInsertInput = z.infer<typeof MythologyInsertSchema>;
export type MythologyUpdateInput = z.infer<typeof MythologyUpdateSchema>;
