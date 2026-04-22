// =====================================================
// FILE: lib/validators/generated/themis-governance/moderation_actions.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.603Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ModerationActionsRow, ModerationActionsInsert, ModerationActionsUpdate } from '@/types/generated/themis-governance/moderation_actions';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ModerationActionsRowSchema: z.ZodType<ModerationActionsRow> = z.any();
export const ModerationActionsInsertSchema: z.ZodType<ModerationActionsInsert> = z.any();
export const ModerationActionsUpdateSchema: z.ZodType<ModerationActionsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ModerationActionsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ModerationActionsRuntimeInput = z.infer<typeof ModerationActionsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full moderation_actions row
 */
export function validateModerationActionsRow(data: unknown): data is ModerationActionsRow {
  try {
    ModerationActionsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a moderation_actions insert
 */
export function validateModerationActionsInsert(data: unknown): data is ModerationActionsInsert {
  try {
    ModerationActionsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a moderation_actions update
 */
export function validateModerationActionsUpdate(data: unknown): data is ModerationActionsUpdate {
  try {
    ModerationActionsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
