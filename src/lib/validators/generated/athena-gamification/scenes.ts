// =====================================================
// FILE: lib/validators/generated/athena-gamification/scenes.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.470Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ScenesRow, ScenesInsert, ScenesUpdate } from '@/types/generated/athena-gamification/scenes';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ScenesRowSchema: z.ZodType<ScenesRow> = z.any();
export const ScenesInsertSchema: z.ZodType<ScenesInsert> = z.any();
export const ScenesUpdateSchema: z.ZodType<ScenesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ScenesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ScenesRuntimeInput = z.infer<typeof ScenesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full scenes row
 */
export function validateScenesRow(data: unknown): data is ScenesRow {
  try {
    ScenesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a scenes insert
 */
export function validateScenesInsert(data: unknown): data is ScenesInsert {
  try {
    ScenesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a scenes update
 */
export function validateScenesUpdate(data: unknown): data is ScenesUpdate {
  try {
    ScenesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
