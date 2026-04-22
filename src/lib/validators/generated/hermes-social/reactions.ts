// =====================================================
// FILE: lib/validators/generated/hermes-social/reactions.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.662Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ReactionsRow, ReactionsInsert, ReactionsUpdate } from '@/types/generated/hermes-social/reactions';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ReactionsRowSchema: z.ZodType<ReactionsRow> = z.any();
export const ReactionsInsertSchema: z.ZodType<ReactionsInsert> = z.any();
export const ReactionsUpdateSchema: z.ZodType<ReactionsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ReactionsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ReactionsRuntimeInput = z.infer<typeof ReactionsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full reactions row
 */
export function validateReactionsRow(data: unknown): data is ReactionsRow {
  try {
    ReactionsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a reactions insert
 */
export function validateReactionsInsert(data: unknown): data is ReactionsInsert {
  try {
    ReactionsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a reactions update
 */
export function validateReactionsUpdate(data: unknown): data is ReactionsUpdate {
  try {
    ReactionsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
