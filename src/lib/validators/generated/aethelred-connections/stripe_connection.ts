// =====================================================
// FILE: lib/validators/generated/aethelred-connections/stripe_connection.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.580Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { StripeConnectionRow, StripeConnectionInsert, StripeConnectionUpdate } from '@/types/generated/aethelred-connections/stripe_connection';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const StripeConnectionRowSchema: z.ZodType<StripeConnectionRow> = z.any();
export const StripeConnectionInsertSchema: z.ZodType<StripeConnectionInsert> = z.any();
export const StripeConnectionUpdateSchema: z.ZodType<StripeConnectionUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const StripeConnectionRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type StripeConnectionRuntimeInput = z.infer<typeof StripeConnectionRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full stripe_connection row
 */
export function validateStripeConnectionRow(data: unknown): data is StripeConnectionRow {
  try {
    StripeConnectionRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a stripe_connection insert
 */
export function validateStripeConnectionInsert(data: unknown): data is StripeConnectionInsert {
  try {
    StripeConnectionInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a stripe_connection update
 */
export function validateStripeConnectionUpdate(data: unknown): data is StripeConnectionUpdate {
  try {
    StripeConnectionUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
