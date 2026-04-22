// =====================================================
// FILE: lib/validators/generated/hephaestus-infrastructure/scripts.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:06.234Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ScriptsRow, ScriptsInsert, ScriptsUpdate } from '@/types/generated/hephaestus-infrastructure/scripts';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ScriptsRowSchema: z.ZodType<ScriptsRow> = z.any();
export const ScriptsInsertSchema: z.ZodType<ScriptsInsert> = z.any();
export const ScriptsUpdateSchema: z.ZodType<ScriptsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ScriptsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ScriptsRuntimeInput = z.infer<typeof ScriptsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full scripts row
 */
export function validateScriptsRow(data: unknown): data is ScriptsRow {
  try {
    ScriptsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a scripts insert
 */
export function validateScriptsInsert(data: unknown): data is ScriptsInsert {
  try {
    ScriptsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a scripts update
 */
export function validateScriptsUpdate(data: unknown): data is ScriptsUpdate {
  try {
    ScriptsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
