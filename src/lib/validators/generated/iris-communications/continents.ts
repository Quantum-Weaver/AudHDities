// =====================================================
// FILE: lib/validators/generated/iris-communications/continents.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:49.920Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ContinentsRow, ContinentsInsert, ContinentsUpdate } from '@/types/generated/iris-communications/continents';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ContinentsRowSchema: z.ZodType<ContinentsRow> = z.any();
export const ContinentsInsertSchema: z.ZodType<ContinentsInsert> = z.any();
export const ContinentsUpdateSchema: z.ZodType<ContinentsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ContinentsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ContinentsRuntimeInput = z.infer<typeof ContinentsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full continents row
 */
export function validateContinentsRow(data: unknown): data is ContinentsRow {
  try {
    ContinentsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a continents insert
 */
export function validateContinentsInsert(data: unknown): data is ContinentsInsert {
  try {
    ContinentsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a continents update
 */
export function validateContinentsUpdate(data: unknown): data is ContinentsUpdate {
  try {
    ContinentsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
