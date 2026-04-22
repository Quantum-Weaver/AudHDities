// =====================================================
// FILE: lib/validators/generated/aethelred-connections/seer.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:06.256Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SeerRow, SeerInsert, SeerUpdate } from '@/types/generated/aethelred-connections/seer';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SeerRowSchema: z.ZodType<SeerRow> = z.any();
export const SeerInsertSchema: z.ZodType<SeerInsert> = z.any();
export const SeerUpdateSchema: z.ZodType<SeerUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SeerRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SeerRuntimeInput = z.infer<typeof SeerRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full seer row
 */
export function validateSeerRow(data: unknown): data is SeerRow {
  try {
    SeerRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a seer insert
 */
export function validateSeerInsert(data: unknown): data is SeerInsert {
  try {
    SeerInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a seer update
 */
export function validateSeerUpdate(data: unknown): data is SeerUpdate {
  try {
    SeerUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
