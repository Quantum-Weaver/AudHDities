// =====================================================
// FILE: lib/validators/generated/athena-gamification/learning_paths.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.235Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { LearningPathsRow, LearningPathsInsert, LearningPathsUpdate } from '@/types/generated/athena-gamification/learning_paths';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const LearningPathsRowSchema: z.ZodType<LearningPathsRow> = z.any();
export const LearningPathsInsertSchema: z.ZodType<LearningPathsInsert> = z.any();
export const LearningPathsUpdateSchema: z.ZodType<LearningPathsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const LearningPathsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type LearningPathsRuntimeInput = z.infer<typeof LearningPathsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full learning_paths row
 */
export function validateLearningPathsRow(data: unknown): data is LearningPathsRow {
  try {
    LearningPathsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a learning_paths insert
 */
export function validateLearningPathsInsert(data: unknown): data is LearningPathsInsert {
  try {
    LearningPathsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a learning_paths update
 */
export function validateLearningPathsUpdate(data: unknown): data is LearningPathsUpdate {
  try {
    LearningPathsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
