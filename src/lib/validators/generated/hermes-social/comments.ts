// =====================================================
// FILE: lib/validators/generated/hermes-social/comments.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:49.867Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { CommentsRow, CommentsInsert, CommentsUpdate } from '@/types/generated/hermes-social/comments';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const CommentsRowSchema: z.ZodType<CommentsRow> = z.any();
export const CommentsInsertSchema: z.ZodType<CommentsInsert> = z.any();
export const CommentsUpdateSchema: z.ZodType<CommentsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const CommentsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type CommentsRuntimeInput = z.infer<typeof CommentsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full comments row
 */
export function validateCommentsRow(data: unknown): data is CommentsRow {
  try {
    CommentsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a comments insert
 */
export function validateCommentsInsert(data: unknown): data is CommentsInsert {
  try {
    CommentsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a comments update
 */
export function validateCommentsUpdate(data: unknown): data is CommentsUpdate {
  try {
    CommentsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
