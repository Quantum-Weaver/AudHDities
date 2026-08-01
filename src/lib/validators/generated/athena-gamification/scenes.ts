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
  background_url: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  difficulty: z.string().nullable(),
  display_order: z.number(),
  icon_url: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  participant_limit: z.number().nullable(),
  scene_type: z.string().nullable(),
  slug: z.string(),
  spawn_rules: z.any().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const ScenesInsertSchema = z.object({
  background_url: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  difficulty: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  participant_limit: z.number().nullable().optional(),
  scene_type: z.string().nullable().optional(),
  slug: z.string(),
  spawn_rules: z.any().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ScenesUpdateSchema = z.object({
  background_url: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  difficulty: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  participant_limit: z.number().nullable().optional(),
  scene_type: z.string().nullable().optional(),
  slug: z.string().optional(),
  spawn_rules: z.any().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ScenesRowInput = z.infer<typeof ScenesRowSchema>;
export type ScenesInsertInput = z.infer<typeof ScenesInsertSchema>;
export type ScenesUpdateInput = z.infer<typeof ScenesUpdateSchema>;
