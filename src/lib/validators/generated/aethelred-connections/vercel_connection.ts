// =====================================================
// FILE: lib/validators/generated/aethelred-connections/vercel_connection.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:06.635Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { VercelConnectionRow, VercelConnectionInsert, VercelConnectionUpdate } from '@/types/generated/aethelred-connections/vercel_connection';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const VercelConnectionRowSchema: z.ZodType<VercelConnectionRow> = z.any();
export const VercelConnectionInsertSchema: z.ZodType<VercelConnectionInsert> = z.any();
export const VercelConnectionUpdateSchema: z.ZodType<VercelConnectionUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const VercelConnectionRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type VercelConnectionRuntimeInput = z.infer<typeof VercelConnectionRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full vercel_connection row
 */
export function validateVercelConnectionRow(data: unknown): data is VercelConnectionRow {
  try {
    VercelConnectionRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a vercel_connection insert
 */
export function validateVercelConnectionInsert(data: unknown): data is VercelConnectionInsert {
  try {
    VercelConnectionInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a vercel_connection update
 */
export function validateVercelConnectionUpdate(data: unknown): data is VercelConnectionUpdate {
  try {
    VercelConnectionUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
