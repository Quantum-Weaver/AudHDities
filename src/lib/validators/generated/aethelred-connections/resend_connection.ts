// =====================================================
// FILE: lib/validators/generated/aethelred-connections/resend_connection.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:06.078Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ResendConnectionRow, ResendConnectionInsert, ResendConnectionUpdate } from '@/types/generated/aethelred-connections/resend_connection';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ResendConnectionRowSchema: z.ZodType<ResendConnectionRow> = z.any();
export const ResendConnectionInsertSchema: z.ZodType<ResendConnectionInsert> = z.any();
export const ResendConnectionUpdateSchema: z.ZodType<ResendConnectionUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ResendConnectionRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ResendConnectionRuntimeInput = z.infer<typeof ResendConnectionRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full resend_connection row
 */
export function validateResendConnectionRow(data: unknown): data is ResendConnectionRow {
  try {
    ResendConnectionRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a resend_connection insert
 */
export function validateResendConnectionInsert(data: unknown): data is ResendConnectionInsert {
  try {
    ResendConnectionInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a resend_connection update
 */
export function validateResendConnectionUpdate(data: unknown): data is ResendConnectionUpdate {
  try {
    ResendConnectionUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
