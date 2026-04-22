// =====================================================
// FILE: lib/validators/generated/aethelred-connections/chancellor.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.094Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ChancellorRow, ChancellorInsert, ChancellorUpdate } from '@/types/generated/aethelred-connections/chancellor';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ChancellorRowSchema: z.ZodType<ChancellorRow> = z.any();
export const ChancellorInsertSchema: z.ZodType<ChancellorInsert> = z.any();
export const ChancellorUpdateSchema: z.ZodType<ChancellorUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ChancellorRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ChancellorRuntimeInput = z.infer<typeof ChancellorRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full chancellor row
 */
export function validateChancellorRow(data: unknown): data is ChancellorRow {
  try {
    ChancellorRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a chancellor insert
 */
export function validateChancellorInsert(data: unknown): data is ChancellorInsert {
  try {
    ChancellorInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a chancellor update
 */
export function validateChancellorUpdate(data: unknown): data is ChancellorUpdate {
  try {
    ChancellorUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
