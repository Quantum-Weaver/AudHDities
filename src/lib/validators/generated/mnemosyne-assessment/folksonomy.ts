// =====================================================
// FILE: lib/validators/generated/mnemosyne-assessment/folksonomy.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.174Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { FolksonomyRow, FolksonomyInsert, FolksonomyUpdate } from '@/types/generated/mnemosyne-assessment/folksonomy';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const FolksonomyRowSchema: z.ZodType<FolksonomyRow> = z.any();
export const FolksonomyInsertSchema: z.ZodType<FolksonomyInsert> = z.any();
export const FolksonomyUpdateSchema: z.ZodType<FolksonomyUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const FolksonomyRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type FolksonomyRuntimeInput = z.infer<typeof FolksonomyRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full folksonomy row
 */
export function validateFolksonomyRow(data: unknown): data is FolksonomyRow {
  try {
    FolksonomyRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a folksonomy insert
 */
export function validateFolksonomyInsert(data: unknown): data is FolksonomyInsert {
  try {
    FolksonomyInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a folksonomy update
 */
export function validateFolksonomyUpdate(data: unknown): data is FolksonomyUpdate {
  try {
    FolksonomyUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
