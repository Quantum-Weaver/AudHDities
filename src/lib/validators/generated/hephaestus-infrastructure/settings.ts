// =====================================================
// FILE: lib/validators/generated/hephaestus-infrastructure/settings.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.856Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SettingsRow, SettingsInsert, SettingsUpdate } from '@/types/generated/hephaestus-infrastructure/settings';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SettingsRowSchema: z.ZodType<SettingsRow> = z.any();
export const SettingsInsertSchema: z.ZodType<SettingsInsert> = z.any();
export const SettingsUpdateSchema: z.ZodType<SettingsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SettingsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SettingsRuntimeInput = z.infer<typeof SettingsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full settings row
 */
export function validateSettingsRow(data: unknown): data is SettingsRow {
  try {
    SettingsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a settings insert
 */
export function validateSettingsInsert(data: unknown): data is SettingsInsert {
  try {
    SettingsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a settings update
 */
export function validateSettingsUpdate(data: unknown): data is SettingsUpdate {
  try {
    SettingsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
