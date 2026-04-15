// =====================================================
// FILE: validators/generated/athena-gamification/scene_participants.ts
// GENERATED: 2026-04-15T18:11:44.417Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// SceneParticipants SCHEMAS
// =====================================================

export const SceneParticipantsRowSchema = z.object({
  created_by: z.string().nullable(),
  joined_at: z.string().nullable(),
  role: z.string().nullable(),
  scene_id: z.string(),
  user_id: z.string(),
});

export const SceneParticipantsInsertSchema = z.object({
  created_by: z.string().nullable().optional(),
  joined_at: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  scene_id: z.string().optional(),
  user_id: z.string().optional(),
});

export const SceneParticipantsUpdateSchema = z.object({
  created_by: z.string().nullable().optional(),
  joined_at: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  scene_id: z.string().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SceneParticipantsRowInput = z.infer<typeof SceneParticipantsRowSchema>;
export type SceneParticipantsInsertInput = z.infer<typeof SceneParticipantsInsertSchema>;
export type SceneParticipantsUpdateInput = z.infer<typeof SceneParticipantsUpdateSchema>;
