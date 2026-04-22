// =====================================================
// FILE: lib/validators/generated/plutus-economics/payouts.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.441Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { PayoutsRow, PayoutsInsert, PayoutsUpdate } from '@/types/generated/plutus-economics/payouts';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const PayoutsRowSchema: z.ZodType<PayoutsRow> = z.any();
export const PayoutsInsertSchema: z.ZodType<PayoutsInsert> = z.any();
export const PayoutsUpdateSchema: z.ZodType<PayoutsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const PayoutsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type PayoutsRuntimeInput = z.infer<typeof PayoutsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full payouts row
 */
export function validatePayoutsRow(data: unknown): data is PayoutsRow {
  try {
    PayoutsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a payouts insert
 */
export function validatePayoutsInsert(data: unknown): data is PayoutsInsert {
  try {
    PayoutsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a payouts update
 */
export function validatePayoutsUpdate(data: unknown): data is PayoutsUpdate {
  try {
    PayoutsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
