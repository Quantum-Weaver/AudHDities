// =====================================================
// FILE: lib/validators/generated/athena-gamification/badges.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.324Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { BadgesRow, BadgesInsert, BadgesUpdate } from '@/types/generated/athena-gamification/badges';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const BadgesRowSchema: z.ZodType<BadgesRow> = z.any();
export const BadgesInsertSchema: z.ZodType<BadgesInsert> = z.any();
export const BadgesUpdateSchema: z.ZodType<BadgesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const BadgesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type BadgesRuntimeInput = z.infer<typeof BadgesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full badges row
 */
export function validateBadgesRow(data: unknown): data is BadgesRow {
  try {
    BadgesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a badges insert
 */
export function validateBadgesInsert(data: unknown): data is BadgesInsert {
  try {
    BadgesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a badges update
 */
export function validateBadgesUpdate(data: unknown): data is BadgesUpdate {
  try {
    BadgesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
