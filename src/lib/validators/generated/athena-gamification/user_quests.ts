// =====================================================
// FILE: lib/validators/generated/athena-gamification/user_quests.ts
// HANDLING: join_table
// GENERATED: 2026-04-22T04:38:06.594Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { UserQuestsRow, UserQuestsInsert, UserQuestsUpdate } from '@/types/generated/athena-gamification/user_quests';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const UserQuestsRowSchema: z.ZodType<UserQuestsRow> = z.any();
export const UserQuestsInsertSchema: z.ZodType<UserQuestsInsert> = z.any();
export const UserQuestsUpdateSchema: z.ZodType<UserQuestsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const UserQuestsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type UserQuestsRuntimeInput = z.infer<typeof UserQuestsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full user_quests row
 */
export function validateUserQuestsRow(data: unknown): data is UserQuestsRow {
  try {
    UserQuestsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a user_quests insert
 */
export function validateUserQuestsInsert(data: unknown): data is UserQuestsInsert {
  try {
    UserQuestsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a user_quests update
 */
export function validateUserQuestsUpdate(data: unknown): data is UserQuestsUpdate {
  try {
    UserQuestsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
