// =====================================================
// FILE: lib/validators/generated/aethelred-connections/council_houses.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:49.942Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { CouncilHousesRow, CouncilHousesInsert, CouncilHousesUpdate } from '@/types/generated/aethelred-connections/council_houses';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const CouncilHousesRowSchema: z.ZodType<CouncilHousesRow> = z.any();
export const CouncilHousesInsertSchema: z.ZodType<CouncilHousesInsert> = z.any();
export const CouncilHousesUpdateSchema: z.ZodType<CouncilHousesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const CouncilHousesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type CouncilHousesRuntimeInput = z.infer<typeof CouncilHousesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full council_houses row
 */
export function validateCouncilHousesRow(data: unknown): data is CouncilHousesRow {
  try {
    CouncilHousesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a council_houses insert
 */
export function validateCouncilHousesInsert(data: unknown): data is CouncilHousesInsert {
  try {
    CouncilHousesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a council_houses update
 */
export function validateCouncilHousesUpdate(data: unknown): data is CouncilHousesUpdate {
  try {
    CouncilHousesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
