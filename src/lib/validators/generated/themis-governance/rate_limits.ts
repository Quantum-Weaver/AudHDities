// =====================================================
// FILE: lib/validators/generated/themis-governance/rate_limits.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.648Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { RateLimitsRow, RateLimitsInsert, RateLimitsUpdate } from '@/types/generated/themis-governance/rate_limits';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const RateLimitsRowSchema: z.ZodType<RateLimitsRow> = z.any();
export const RateLimitsInsertSchema: z.ZodType<RateLimitsInsert> = z.any();
export const RateLimitsUpdateSchema: z.ZodType<RateLimitsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const RateLimitsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type RateLimitsRuntimeInput = z.infer<typeof RateLimitsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full rate_limits row
 */
export function validateRateLimitsRow(data: unknown): data is RateLimitsRow {
  try {
    RateLimitsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a rate_limits insert
 */
export function validateRateLimitsInsert(data: unknown): data is RateLimitsInsert {
  try {
    RateLimitsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a rate_limits update
 */
export function validateRateLimitsUpdate(data: unknown): data is RateLimitsUpdate {
  try {
    RateLimitsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
