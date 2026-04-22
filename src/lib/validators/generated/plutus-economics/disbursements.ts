// =====================================================
// FILE: lib/validators/generated/plutus-economics/disbursements.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.596Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { DisbursementsRow, DisbursementsInsert, DisbursementsUpdate } from '@/types/generated/plutus-economics/disbursements';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const DisbursementsRowSchema: z.ZodType<DisbursementsRow> = z.any();
export const DisbursementsInsertSchema: z.ZodType<DisbursementsInsert> = z.any();
export const DisbursementsUpdateSchema: z.ZodType<DisbursementsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const DisbursementsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type DisbursementsRuntimeInput = z.infer<typeof DisbursementsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full disbursements row
 */
export function validateDisbursementsRow(data: unknown): data is DisbursementsRow {
  try {
    DisbursementsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a disbursements insert
 */
export function validateDisbursementsInsert(data: unknown): data is DisbursementsInsert {
  try {
    DisbursementsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a disbursements update
 */
export function validateDisbursementsUpdate(data: unknown): data is DisbursementsUpdate {
  try {
    DisbursementsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
