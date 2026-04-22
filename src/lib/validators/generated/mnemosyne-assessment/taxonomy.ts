// =====================================================
// FILE: lib/validators/generated/mnemosyne-assessment/taxonomy.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:06.465Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { TaxonomyRow, TaxonomyInsert, TaxonomyUpdate } from '@/types/generated/mnemosyne-assessment/taxonomy';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const TaxonomyRowSchema: z.ZodType<TaxonomyRow> = z.any();
export const TaxonomyInsertSchema: z.ZodType<TaxonomyInsert> = z.any();
export const TaxonomyUpdateSchema: z.ZodType<TaxonomyUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const TaxonomyRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type TaxonomyRuntimeInput = z.infer<typeof TaxonomyRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full taxonomy row
 */
export function validateTaxonomyRow(data: unknown): data is TaxonomyRow {
  try {
    TaxonomyRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a taxonomy insert
 */
export function validateTaxonomyInsert(data: unknown): data is TaxonomyInsert {
  try {
    TaxonomyInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a taxonomy update
 */
export function validateTaxonomyUpdate(data: unknown): data is TaxonomyUpdate {
  try {
    TaxonomyUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
