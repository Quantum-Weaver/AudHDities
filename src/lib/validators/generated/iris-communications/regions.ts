// =====================================================
// FILE: lib/validators/generated/iris-communications/regions.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.339Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { RegionsRow, RegionsInsert, RegionsUpdate } from '@/types/generated/iris-communications/regions';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const RegionsRowSchema: z.ZodType<RegionsRow> = z.any();
export const RegionsInsertSchema: z.ZodType<RegionsInsert> = z.any();
export const RegionsUpdateSchema: z.ZodType<RegionsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const RegionsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type RegionsRuntimeInput = z.infer<typeof RegionsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full regions row
 */
export function validateRegionsRow(data: unknown): data is RegionsRow {
  try {
    RegionsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a regions insert
 */
export function validateRegionsInsert(data: unknown): data is RegionsInsert {
  try {
    RegionsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a regions update
 */
export function validateRegionsUpdate(data: unknown): data is RegionsUpdate {
  try {
    RegionsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
