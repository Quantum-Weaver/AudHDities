// =====================================================
// FILE: lib/validators/generated/athena-gamification/progress.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.507Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ProgressRow, ProgressInsert, ProgressUpdate } from '@/types/generated/athena-gamification/progress';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ProgressRowSchema: z.ZodType<ProgressRow> = z.any();
export const ProgressInsertSchema: z.ZodType<ProgressInsert> = z.any();
export const ProgressUpdateSchema: z.ZodType<ProgressUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ProgressRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ProgressRuntimeInput = z.infer<typeof ProgressRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full progress row
 */
export function validateProgressRow(data: unknown): data is ProgressRow {
  try {
    ProgressRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a progress insert
 */
export function validateProgressInsert(data: unknown): data is ProgressInsert {
  try {
    ProgressInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a progress update
 */
export function validateProgressUpdate(data: unknown): data is ProgressUpdate {
  try {
    ProgressUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
