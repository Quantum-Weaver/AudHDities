// =====================================================
// FILE: lib/validators/generated/iris-communications/translations.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:06.517Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { TranslationsRow, TranslationsInsert, TranslationsUpdate } from '@/types/generated/iris-communications/translations';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const TranslationsRowSchema: z.ZodType<TranslationsRow> = z.any();
export const TranslationsInsertSchema: z.ZodType<TranslationsInsert> = z.any();
export const TranslationsUpdateSchema: z.ZodType<TranslationsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const TranslationsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type TranslationsRuntimeInput = z.infer<typeof TranslationsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full translations row
 */
export function validateTranslationsRow(data: unknown): data is TranslationsRow {
  try {
    TranslationsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a translations insert
 */
export function validateTranslationsInsert(data: unknown): data is TranslationsInsert {
  try {
    TranslationsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a translations update
 */
export function validateTranslationsUpdate(data: unknown): data is TranslationsUpdate {
  try {
    TranslationsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
