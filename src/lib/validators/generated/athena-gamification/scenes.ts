// =====================================================
// FILE: validators/generated/athena-gamification/scenes.ts
// GENERATED: 2026-04-15T18:11:44.418Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { COUNCIL_HOUSE } from '@/lib/constants/generated/athena-gamification/council_house';
import { SCENE_TYPE } from '@/lib/constants/generated/athena-gamification/scene_type';

// =====================================================
// Scenes SCHEMAS
// =====================================================

export const ScenesRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  creator_id: z.string(),
  description: z.string(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).nullable(),
  id: z.string(),
  instructions: z.string().nullable(),
  is_active: z.boolean().nullable(),
  mythology_id: z.string().nullable(),
  participant_count: z.number().nullable(),
  scheduled_for: z.string().nullable(),
  slug: z.string(),
  title: z.string(),
  type: z.enum(Object.values(SCENE_TYPE)),
  updated_at: z.string().nullable(),
});

export const ScenesInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_id: z.string().optional(),
  description: z.string().optional(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  id: z.string().optional(),
  instructions: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  mythology_id: z.string().nullable().optional(),
  participant_count: z.number().nullable().optional(),
  scheduled_for: z.string().nullable().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  type: z.enum(Object.values(SCENE_TYPE)).optional(),
  updated_at: z.string().nullable().optional(),
});

export const ScenesUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_id: z.string().optional(),
  description: z.string().optional(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  id: z.string().optional(),
  instructions: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  mythology_id: z.string().nullable().optional(),
  participant_count: z.number().nullable().optional(),
  scheduled_for: z.string().nullable().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  type: z.enum(Object.values(SCENE_TYPE)).optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ScenesRowInput = z.infer<typeof ScenesRowSchema>;
export type ScenesInsertInput = z.infer<typeof ScenesInsertSchema>;
export type ScenesUpdateInput = z.infer<typeof ScenesUpdateSchema>;
