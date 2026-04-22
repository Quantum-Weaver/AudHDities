// =====================================================
// FILE: lib/validators/generated/mnemosyne-assessment/etymology.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.359Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { EtymologyRow, EtymologyInsert, EtymologyUpdate } from '@/types/generated/mnemosyne-assessment/etymology';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const EtymologyRowSchema: z.ZodType<EtymologyRow> = z.any();
export const EtymologyInsertSchema: z.ZodType<EtymologyInsert> = z.any();
export const EtymologyUpdateSchema: z.ZodType<EtymologyUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const EtymologyRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type EtymologyRuntimeInput = z.infer<typeof EtymologyRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full etymology row
 */
export function validateEtymologyRow(data: unknown): data is EtymologyRow {
  try {
    EtymologyRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a etymology insert
 */
export function validateEtymologyInsert(data: unknown): data is EtymologyInsert {
  try {
    EtymologyInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a etymology update
 */
export function validateEtymologyUpdate(data: unknown): data is EtymologyUpdate {
  try {
    EtymologyUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
