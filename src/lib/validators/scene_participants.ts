// =====================================================
// FILE: validators/scene_participants.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// SceneParticipants SCHEMAS
// =====================================================

export const SceneParticipantsRowSchema = z.object({
  joined_at: z.string().nullable(),
  role: z.string().nullable(),
  scene_id: z.string(),
  user_id: z.string(),
});

export const SceneParticipantsInsertSchema = z.object({
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
