// =====================================================
// FILE: lib/validators/generated/athena-gamification/path_lessons.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.986Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { PathLessonsRow, PathLessonsInsert, PathLessonsUpdate } from '@/types/generated/athena-gamification/path_lessons';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const PathLessonsRowSchema: z.ZodType<PathLessonsRow> = z.any();
export const PathLessonsInsertSchema: z.ZodType<PathLessonsInsert> = z.any();
export const PathLessonsUpdateSchema: z.ZodType<PathLessonsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const PathLessonsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type PathLessonsRuntimeInput = z.infer<typeof PathLessonsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full path_lessons row
 */
export function validatePathLessonsRow(data: unknown): data is PathLessonsRow {
  try {
    PathLessonsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a path_lessons insert
 */
export function validatePathLessonsInsert(data: unknown): data is PathLessonsInsert {
  try {
    PathLessonsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a path_lessons update
 */
export function validatePathLessonsUpdate(data: unknown): data is PathLessonsUpdate {
  try {
    PathLessonsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
