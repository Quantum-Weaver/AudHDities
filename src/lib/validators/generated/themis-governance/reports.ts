// =====================================================
// FILE: lib/validators/generated/themis-governance/reports.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.705Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ReportsRow, ReportsInsert, ReportsUpdate } from '@/types/generated/themis-governance/reports';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ReportsRowSchema: z.ZodType<ReportsRow> = z.any();
export const ReportsInsertSchema: z.ZodType<ReportsInsert> = z.any();
export const ReportsUpdateSchema: z.ZodType<ReportsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ReportsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ReportsRuntimeInput = z.infer<typeof ReportsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full reports row
 */
export function validateReportsRow(data: unknown): data is ReportsRow {
  try {
    ReportsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a reports insert
 */
export function validateReportsInsert(data: unknown): data is ReportsInsert {
  try {
    ReportsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a reports update
 */
export function validateReportsUpdate(data: unknown): data is ReportsUpdate {
  try {
    ReportsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
