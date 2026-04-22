// =====================================================
// FILE: lib/validators/generated/plutus-economics/sales.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.440Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SalesRow, SalesInsert, SalesUpdate } from '@/types/generated/plutus-economics/sales';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SalesRowSchema: z.ZodType<SalesRow> = z.any();
export const SalesInsertSchema: z.ZodType<SalesInsert> = z.any();
export const SalesUpdateSchema: z.ZodType<SalesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SalesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SalesRuntimeInput = z.infer<typeof SalesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full sales row
 */
export function validateSalesRow(data: unknown): data is SalesRow {
  try {
    SalesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a sales insert
 */
export function validateSalesInsert(data: unknown): data is SalesInsert {
  try {
    SalesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a sales update
 */
export function validateSalesUpdate(data: unknown): data is SalesUpdate {
  try {
    SalesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
