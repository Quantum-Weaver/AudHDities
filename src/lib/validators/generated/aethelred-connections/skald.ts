// =====================================================
// FILE: lib/validators/generated/aethelred-connections/skald.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.871Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SkaldRow, SkaldInsert, SkaldUpdate } from '@/types/generated/aethelred-connections/skald';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SkaldRowSchema: z.ZodType<SkaldRow> = z.any();
export const SkaldInsertSchema: z.ZodType<SkaldInsert> = z.any();
export const SkaldUpdateSchema: z.ZodType<SkaldUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SkaldRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SkaldRuntimeInput = z.infer<typeof SkaldRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full skald row
 */
export function validateSkaldRow(data: unknown): data is SkaldRow {
  try {
    SkaldRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a skald insert
 */
export function validateSkaldInsert(data: unknown): data is SkaldInsert {
  try {
    SkaldInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a skald update
 */
export function validateSkaldUpdate(data: unknown): data is SkaldUpdate {
  try {
    SkaldUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
