// =====================================================
// FILE: validators/mind_traits.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// MindTraits SCHEMAS
// =====================================================

export const MindTraitsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string(),
  display_order: z.number(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  trait_category: z.string().nullable(),
  trait_label_high: z.string().nullable(),
  trait_label_low: z.string().nullable(),
  trait_name: z.string(),
  trait_notes: z.string().nullable(),
  trait_value: z.number(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const MindTraitsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string(),
  display_order: z.number().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  trait_category: z.string().nullable().optional(),
  trait_label_high: z.string().nullable().optional(),
  trait_label_low: z.string().nullable().optional(),
  trait_name: z.string(),
  trait_notes: z.string().nullable().optional(),
  trait_value: z.number(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const MindTraitsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  display_order: z.number().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  trait_category: z.string().nullable().optional(),
  trait_label_high: z.string().nullable().optional(),
  trait_label_low: z.string().nullable().optional(),
  trait_name: z.string().optional(),
  trait_notes: z.string().nullable().optional(),
  trait_value: z.number().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type MindTraitsRowInput = z.infer<typeof MindTraitsRowSchema>;
export type MindTraitsInsertInput = z.infer<typeof MindTraitsInsertSchema>;
export type MindTraitsUpdateInput = z.infer<typeof MindTraitsUpdateSchema>;
