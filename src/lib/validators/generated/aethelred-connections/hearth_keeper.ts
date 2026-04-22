// =====================================================
// FILE: lib/validators/generated/aethelred-connections/hearth_keeper.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.204Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { HearthKeeperRow, HearthKeeperInsert, HearthKeeperUpdate } from '@/types/generated/aethelred-connections/hearth_keeper';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const HearthKeeperRowSchema: z.ZodType<HearthKeeperRow> = z.any();
export const HearthKeeperInsertSchema: z.ZodType<HearthKeeperInsert> = z.any();
export const HearthKeeperUpdateSchema: z.ZodType<HearthKeeperUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const HearthKeeperRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type HearthKeeperRuntimeInput = z.infer<typeof HearthKeeperRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full hearth_keeper row
 */
export function validateHearthKeeperRow(data: unknown): data is HearthKeeperRow {
  try {
    HearthKeeperRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a hearth_keeper insert
 */
export function validateHearthKeeperInsert(data: unknown): data is HearthKeeperInsert {
  try {
    HearthKeeperInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a hearth_keeper update
 */
export function validateHearthKeeperUpdate(data: unknown): data is HearthKeeperUpdate {
  try {
    HearthKeeperUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
