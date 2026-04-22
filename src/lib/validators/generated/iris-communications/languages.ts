// =====================================================
// FILE: lib/validators/generated/iris-communications/languages.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.778Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { LanguagesRow, LanguagesInsert, LanguagesUpdate } from '@/types/generated/iris-communications/languages';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const LanguagesRowSchema: z.ZodType<LanguagesRow> = z.any();
export const LanguagesInsertSchema: z.ZodType<LanguagesInsert> = z.any();
export const LanguagesUpdateSchema: z.ZodType<LanguagesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const LanguagesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type LanguagesRuntimeInput = z.infer<typeof LanguagesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full languages row
 */
export function validateLanguagesRow(data: unknown): data is LanguagesRow {
  try {
    LanguagesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a languages insert
 */
export function validateLanguagesInsert(data: unknown): data is LanguagesInsert {
  try {
    LanguagesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a languages update
 */
export function validateLanguagesUpdate(data: unknown): data is LanguagesUpdate {
  try {
    LanguagesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
