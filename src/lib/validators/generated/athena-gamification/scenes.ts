// =====================================================
// FILE: validators/scenes.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Scenes SCHEMAS
// =====================================================

export const ScenesRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  creator_id: z.string(),
  description: z.string(),
  house: z.enum(ENUM_VALUES.councilHouse).nullable(),
  instructions: z.string().nullable(),
  is_active: z.boolean().nullable(),
  mythology_id: z.string().nullable(),
  participant_count: z.number().nullable(),
  scenes_id: z.string(),
  scheduled_for: z.string().nullable(),
  slug: z.string(),
  title: z.string(),
  type: z.enum(ENUM_VALUES.sceneType),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const ScenesInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_id: z.string(),
  description: z.string(),
  house: z.enum(ENUM_VALUES.councilHouse).nullable().optional(),
  instructions: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  mythology_id: z.string().nullable().optional(),
  participant_count: z.number().nullable().optional(),
  scenes_id: z.string().optional(),
  scheduled_for: z.string().nullable().optional(),
  slug: z.string(),
  title: z.string(),
  type: z.enum(ENUM_VALUES.sceneType),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ScenesUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_id: z.string().optional(),
  description: z.string().optional(),
  house: z.enum(ENUM_VALUES.councilHouse).nullable().optional(),
  instructions: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  mythology_id: z.string().nullable().optional(),
  participant_count: z.number().nullable().optional(),
  scenes_id: z.string().optional(),
  scheduled_for: z.string().nullable().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  type: z.enum(ENUM_VALUES.sceneType).optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ScenesRowInput = z.infer<typeof ScenesRowSchema>;
export type ScenesInsertInput = z.infer<typeof ScenesInsertSchema>;
export type ScenesUpdateInput = z.infer<typeof ScenesUpdateSchema>;
