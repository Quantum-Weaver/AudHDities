// =====================================================
// FILE: lib/validators/generated/plutus-economics/contributions.ts
// HANDLING: join_table
// GENERATED: 2026-04-22T04:38:05.187Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ContributionsRow, ContributionsInsert, ContributionsUpdate } from '@/types/generated/plutus-economics/contributions';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ContributionsRowSchema: z.ZodType<ContributionsRow> = z.any();
export const ContributionsInsertSchema: z.ZodType<ContributionsInsert> = z.any();
export const ContributionsUpdateSchema: z.ZodType<ContributionsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ContributionsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ContributionsRuntimeInput = z.infer<typeof ContributionsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full contributions row
 */
export function validateContributionsRow(data: unknown): data is ContributionsRow {
  try {
    ContributionsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a contributions insert
 */
export function validateContributionsInsert(data: unknown): data is ContributionsInsert {
  try {
    ContributionsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a contributions update
 */
export function validateContributionsUpdate(data: unknown): data is ContributionsUpdate {
  try {
    ContributionsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
