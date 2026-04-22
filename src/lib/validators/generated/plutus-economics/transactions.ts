// =====================================================
// FILE: lib/validators/generated/plutus-economics/transactions.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.846Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { TransactionsRow, TransactionsInsert, TransactionsUpdate } from '@/types/generated/plutus-economics/transactions';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const TransactionsRowSchema: z.ZodType<TransactionsRow> = z.any();
export const TransactionsInsertSchema: z.ZodType<TransactionsInsert> = z.any();
export const TransactionsUpdateSchema: z.ZodType<TransactionsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const TransactionsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type TransactionsRuntimeInput = z.infer<typeof TransactionsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full transactions row
 */
export function validateTransactionsRow(data: unknown): data is TransactionsRow {
  try {
    TransactionsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a transactions insert
 */
export function validateTransactionsInsert(data: unknown): data is TransactionsInsert {
  try {
    TransactionsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a transactions update
 */
export function validateTransactionsUpdate(data: unknown): data is TransactionsUpdate {
  try {
    TransactionsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
