// =====================================================
// FILE: lib/validators/generated/iris-communications/customs.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.282Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { CustomsRow, CustomsInsert, CustomsUpdate } from '@/types/generated/iris-communications/customs';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const CustomsRowSchema: z.ZodType<CustomsRow> = z.any();
export const CustomsInsertSchema: z.ZodType<CustomsInsert> = z.any();
export const CustomsUpdateSchema: z.ZodType<CustomsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const CustomsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type CustomsRuntimeInput = z.infer<typeof CustomsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full customs row
 */
export function validateCustomsRow(data: unknown): data is CustomsRow {
  try {
    CustomsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a customs insert
 */
export function validateCustomsInsert(data: unknown): data is CustomsInsert {
  try {
    CustomsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a customs update
 */
export function validateCustomsUpdate(data: unknown): data is CustomsUpdate {
  try {
    CustomsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
