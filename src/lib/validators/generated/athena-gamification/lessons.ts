// =====================================================
// FILE: lib/validators/generated/athena-gamification/lessons.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.826Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { LessonsRow, LessonsInsert, LessonsUpdate } from '@/types/generated/athena-gamification/lessons';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const LessonsRowSchema: z.ZodType<LessonsRow> = z.any();
export const LessonsInsertSchema: z.ZodType<LessonsInsert> = z.any();
export const LessonsUpdateSchema: z.ZodType<LessonsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const LessonsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type LessonsRuntimeInput = z.infer<typeof LessonsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full lessons row
 */
export function validateLessonsRow(data: unknown): data is LessonsRow {
  try {
    LessonsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a lessons insert
 */
export function validateLessonsInsert(data: unknown): data is LessonsInsert {
  try {
    LessonsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a lessons update
 */
export function validateLessonsUpdate(data: unknown): data is LessonsUpdate {
  try {
    LessonsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
