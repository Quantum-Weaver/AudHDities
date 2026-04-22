// =====================================================
// FILE: lib/validators/generated/iris-communications/localization.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.870Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { LocalizationRow, LocalizationInsert, LocalizationUpdate } from '@/types/generated/iris-communications/localization';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const LocalizationRowSchema: z.ZodType<LocalizationRow> = z.any();
export const LocalizationInsertSchema: z.ZodType<LocalizationInsert> = z.any();
export const LocalizationUpdateSchema: z.ZodType<LocalizationUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const LocalizationRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type LocalizationRuntimeInput = z.infer<typeof LocalizationRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full localization row
 */
export function validateLocalizationRow(data: unknown): data is LocalizationRow {
  try {
    LocalizationRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a localization insert
 */
export function validateLocalizationInsert(data: unknown): data is LocalizationInsert {
  try {
    LocalizationInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a localization update
 */
export function validateLocalizationUpdate(data: unknown): data is LocalizationUpdate {
  try {
    LocalizationUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
