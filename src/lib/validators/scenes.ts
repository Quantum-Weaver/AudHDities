// =====================================================
// FILE: validators/scenes.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Scenes SCHEMAS
// =====================================================

export const ScenesRowSchema = z.object({
  created_at: z.string().nullable(),
  creator_id: z.string(),
  description: z.string(),
  house: z.any().nullable(),
  id: z.string(),
  instructions: z.string().nullable(),
  is_active: z.boolean().nullable(),
  mythology_id: z.string().nullable(),
  participant_count: z.number().nullable(),
  scheduled_for: z.string().nullable(),
  slug: z.string(),
  title: z.string(),
  type: z.any(),
  updated_at: z.string().nullable(),
});

export const ScenesInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  creator_id: z.string().optional(),
  description: z.string().optional(),
  house: z.any().nullable().optional(),
  id: z.string().optional(),
  instructions: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  mythology_id: z.string().nullable().optional(),
  participant_count: z.number().nullable().optional(),
  scheduled_for: z.string().nullable().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  type: z.any().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ScenesRowInput = z.infer<typeof ScenesRowSchema>;
export type ScenesInsertInput = z.infer<typeof ScenesInsertSchema>;
