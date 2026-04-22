// =====================================================
// FILE: lib/validators/generated/aethelred-connections/executioner.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.371Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ExecutionerRow, ExecutionerInsert, ExecutionerUpdate } from '@/types/generated/aethelred-connections/executioner';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ExecutionerRowSchema: z.ZodType<ExecutionerRow> = z.any();
export const ExecutionerInsertSchema: z.ZodType<ExecutionerInsert> = z.any();
export const ExecutionerUpdateSchema: z.ZodType<ExecutionerUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ExecutionerRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ExecutionerRuntimeInput = z.infer<typeof ExecutionerRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full executioner row
 */
export function validateExecutionerRow(data: unknown): data is ExecutionerRow {
  try {
    ExecutionerRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a executioner insert
 */
export function validateExecutionerInsert(data: unknown): data is ExecutionerInsert {
  try {
    ExecutionerInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a executioner update
 */
export function validateExecutionerUpdate(data: unknown): data is ExecutionerUpdate {
  try {
    ExecutionerUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
