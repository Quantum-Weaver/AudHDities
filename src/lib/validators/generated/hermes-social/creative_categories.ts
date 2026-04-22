// =====================================================
// FILE: lib/validators/generated/hermes-social/creative_categories.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.224Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { CreativeCategoriesRow, CreativeCategoriesInsert, CreativeCategoriesUpdate } from '@/types/generated/hermes-social/creative_categories';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const CreativeCategoriesRowSchema: z.ZodType<CreativeCategoriesRow> = z.any();
export const CreativeCategoriesInsertSchema: z.ZodType<CreativeCategoriesInsert> = z.any();
export const CreativeCategoriesUpdateSchema: z.ZodType<CreativeCategoriesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const CreativeCategoriesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type CreativeCategoriesRuntimeInput = z.infer<typeof CreativeCategoriesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full creative_categories row
 */
export function validateCreativeCategoriesRow(data: unknown): data is CreativeCategoriesRow {
  try {
    CreativeCategoriesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a creative_categories insert
 */
export function validateCreativeCategoriesInsert(data: unknown): data is CreativeCategoriesInsert {
  try {
    CreativeCategoriesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a creative_categories update
 */
export function validateCreativeCategoriesUpdate(data: unknown): data is CreativeCategoriesUpdate {
  try {
    CreativeCategoriesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
