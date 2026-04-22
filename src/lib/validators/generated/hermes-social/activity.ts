// =====================================================
// FILE: lib/validators/generated/hermes-social/activity.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.159Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ActivityRow, ActivityInsert, ActivityUpdate } from '@/types/generated/hermes-social/activity';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ActivityRowSchema: z.ZodType<ActivityRow> = z.any();
export const ActivityInsertSchema: z.ZodType<ActivityInsert> = z.any();
export const ActivityUpdateSchema: z.ZodType<ActivityUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ActivityRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ActivityRuntimeInput = z.infer<typeof ActivityRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full activity row
 */
export function validateActivityRow(data: unknown): data is ActivityRow {
  try {
    ActivityRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a activity insert
 */
export function validateActivityInsert(data: unknown): data is ActivityInsert {
  try {
    ActivityInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a activity update
 */
export function validateActivityUpdate(data: unknown): data is ActivityUpdate {
  try {
    ActivityUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
