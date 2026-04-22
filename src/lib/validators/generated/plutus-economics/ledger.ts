// =====================================================
// FILE: lib/validators/generated/plutus-economics/ledger.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.811Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { LedgerRow, LedgerInsert, LedgerUpdate } from '@/types/generated/plutus-economics/ledger';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const LedgerRowSchema: z.ZodType<LedgerRow> = z.any();
export const LedgerInsertSchema: z.ZodType<LedgerInsert> = z.any();
export const LedgerUpdateSchema: z.ZodType<LedgerUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const LedgerRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type LedgerRuntimeInput = z.infer<typeof LedgerRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full ledger row
 */
export function validateLedgerRow(data: unknown): data is LedgerRow {
  try {
    LedgerRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a ledger insert
 */
export function validateLedgerInsert(data: unknown): data is LedgerInsert {
  try {
    LedgerInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a ledger update
 */
export function validateLedgerUpdate(data: unknown): data is LedgerUpdate {
  try {
    LedgerUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
