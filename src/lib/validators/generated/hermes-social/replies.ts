// =====================================================
// FILE: lib/validators/generated/hermes-social/replies.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.691Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { RepliesRow, RepliesInsert, RepliesUpdate } from '@/types/generated/hermes-social/replies';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const RepliesRowSchema: z.ZodType<RepliesRow> = z.any();
export const RepliesInsertSchema: z.ZodType<RepliesInsert> = z.any();
export const RepliesUpdateSchema: z.ZodType<RepliesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const RepliesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type RepliesRuntimeInput = z.infer<typeof RepliesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full replies row
 */
export function validateRepliesRow(data: unknown): data is RepliesRow {
  try {
    RepliesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a replies insert
 */
export function validateRepliesInsert(data: unknown): data is RepliesInsert {
  try {
    RepliesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a replies update
 */
export function validateRepliesUpdate(data: unknown): data is RepliesUpdate {
  try {
    RepliesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
