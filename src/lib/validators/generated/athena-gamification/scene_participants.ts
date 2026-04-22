// =====================================================
// FILE: lib/validators/generated/athena-gamification/scene_participants.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.771Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SceneParticipantsRow, SceneParticipantsInsert, SceneParticipantsUpdate } from '@/types/generated/athena-gamification/scene_participants';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SceneParticipantsRowSchema: z.ZodType<SceneParticipantsRow> = z.any();
export const SceneParticipantsInsertSchema: z.ZodType<SceneParticipantsInsert> = z.any();
export const SceneParticipantsUpdateSchema: z.ZodType<SceneParticipantsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SceneParticipantsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SceneParticipantsRuntimeInput = z.infer<typeof SceneParticipantsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full scene_participants row
 */
export function validateSceneParticipantsRow(data: unknown): data is SceneParticipantsRow {
  try {
    SceneParticipantsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a scene_participants insert
 */
export function validateSceneParticipantsInsert(data: unknown): data is SceneParticipantsInsert {
  try {
    SceneParticipantsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a scene_participants update
 */
export function validateSceneParticipantsUpdate(data: unknown): data is SceneParticipantsUpdate {
  try {
    SceneParticipantsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
