// =====================================================
// FILE: validators/scene_participants.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// SceneParticipants SCHEMAS
// =====================================================

export const SceneParticipantsRowSchema = z.object({
  created_at: z.string(),
  id: z.string(),
  is_active: z.boolean(),
  joined_at: z.string(),
  last_active_at: z.string(),
  scene_id: z.string(),
  updated_at: z.string(),
  user_id: z.string(),
});

export const SceneParticipantsInsertSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  joined_at: z.string().optional(),
  last_active_at: z.string().optional(),
  scene_id: z.string(),
  updated_at: z.string().optional(),
  user_id: z.string(),
});

export const SceneParticipantsUpdateSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  joined_at: z.string().optional(),
  last_active_at: z.string().optional(),
  scene_id: z.string().optional(),
  updated_at: z.string().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SceneParticipantsRowInput = z.infer<typeof SceneParticipantsRowSchema>;
export type SceneParticipantsInsertInput = z.infer<typeof SceneParticipantsInsertSchema>;
export type SceneParticipantsUpdateInput = z.infer<typeof SceneParticipantsUpdateSchema>;
