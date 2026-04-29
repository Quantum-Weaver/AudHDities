// =====================================================
// FILE: validators/bubbles.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Bubbles SCHEMAS
// =====================================================

export const BubblesRowSchema = z.object({
  appearance_weight: z.number().nullable(),
  collection_name: z.string().nullable(),
  collection_order: z.number().nullable(),
  color: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  glow_color: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  name: z.string(),
  points_value: z.number(),
  rarity: z.string(),
  slug: z.string(),
  updated_at: z.string().nullable(),
});

export const BubblesInsertSchema = z.object({
  appearance_weight: z.number().nullable().optional(),
  collection_name: z.string().nullable().optional(),
  collection_order: z.number().nullable().optional(),
  color: z.string(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  glow_color: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string(),
  points_value: z.number().optional(),
  rarity: z.string(),
  slug: z.string(),
  updated_at: z.string().nullable().optional(),
});

export const BubblesUpdateSchema = z.object({
  appearance_weight: z.number().nullable().optional(),
  collection_name: z.string().nullable().optional(),
  collection_order: z.number().nullable().optional(),
  color: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  glow_color: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string().optional(),
  points_value: z.number().optional(),
  rarity: z.string().optional(),
  slug: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type BubblesRowInput = z.infer<typeof BubblesRowSchema>;
export type BubblesInsertInput = z.infer<typeof BubblesInsertSchema>;
export type BubblesUpdateInput = z.infer<typeof BubblesUpdateSchema>;
