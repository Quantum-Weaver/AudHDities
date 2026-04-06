// =====================================================
// FILE: validators/mythology.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Mythology SCHEMAS
// =====================================================

export const MythologyRowSchema = z.object({
  author_id: z.string(),
  content: z.string(),
  created_at: z.string().nullable(),
  house: z.any().nullable(),
  id: z.string(),
  is_published: z.boolean().nullable(),
  order_index: z.number().nullable(),
  series_id: z.string().nullable(),
  slug: z.string(),
  title: z.string(),
  type: z.any(),
  updated_at: z.string().nullable(),
});

export const MythologyInsertSchema = z.object({
  author_id: z.string().optional(),
  content: z.string().optional(),
  created_at: z.string().nullable().optional(),
  house: z.any().nullable().optional(),
  id: z.string().optional(),
  is_published: z.boolean().nullable().optional(),
  order_index: z.number().nullable().optional(),
  series_id: z.string().nullable().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  type: z.any().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type MythologyRowInput = z.infer<typeof MythologyRowSchema>;
export type MythologyInsertInput = z.infer<typeof MythologyInsertSchema>;
