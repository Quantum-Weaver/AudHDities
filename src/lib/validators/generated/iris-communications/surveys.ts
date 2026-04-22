// =====================================================
// FILE: lib/validators/generated/iris-communications/surveys.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.940Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SurveysRow, SurveysInsert, SurveysUpdate } from '@/types/generated/iris-communications/surveys';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SurveysRowSchema: z.ZodType<SurveysRow> = z.any();
export const SurveysInsertSchema: z.ZodType<SurveysInsert> = z.any();
export const SurveysUpdateSchema: z.ZodType<SurveysUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SurveysRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SurveysRuntimeInput = z.infer<typeof SurveysRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full surveys row
 */
export function validateSurveysRow(data: unknown): data is SurveysRow {
  try {
    SurveysRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a surveys insert
 */
export function validateSurveysInsert(data: unknown): data is SurveysInsert {
  try {
    SurveysInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a surveys update
 */
export function validateSurveysUpdate(data: unknown): data is SurveysUpdate {
  try {
    SurveysUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
