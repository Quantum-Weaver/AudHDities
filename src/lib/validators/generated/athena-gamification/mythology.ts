// =====================================================
// FILE: lib/validators/generated/athena-gamification/mythology.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.398Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { MythologyRow, MythologyInsert, MythologyUpdate } from '@/types/generated/athena-gamification/mythology';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const MythologyRowSchema: z.ZodType<MythologyRow> = z.any();
export const MythologyInsertSchema: z.ZodType<MythologyInsert> = z.any();
export const MythologyUpdateSchema: z.ZodType<MythologyUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const MythologyRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type MythologyRuntimeInput = z.infer<typeof MythologyRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full mythology row
 */
export function validateMythologyRow(data: unknown): data is MythologyRow {
  try {
    MythologyRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a mythology insert
 */
export function validateMythologyInsert(data: unknown): data is MythologyInsert {
  try {
    MythologyInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a mythology update
 */
export function validateMythologyUpdate(data: unknown): data is MythologyUpdate {
  try {
    MythologyUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
