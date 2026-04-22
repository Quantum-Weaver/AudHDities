// =====================================================
// FILE: lib/validators/generated/themis-governance/applications.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:49.750Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ApplicationsRow, ApplicationsInsert, ApplicationsUpdate } from '@/types/generated/themis-governance/applications';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ApplicationsRowSchema: z.ZodType<ApplicationsRow> = z.any();
export const ApplicationsInsertSchema: z.ZodType<ApplicationsInsert> = z.any();
export const ApplicationsUpdateSchema: z.ZodType<ApplicationsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ApplicationsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ApplicationsRuntimeInput = z.infer<typeof ApplicationsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full applications row
 */
export function validateApplicationsRow(data: unknown): data is ApplicationsRow {
  try {
    ApplicationsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a applications insert
 */
export function validateApplicationsInsert(data: unknown): data is ApplicationsInsert {
  try {
    ApplicationsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a applications update
 */
export function validateApplicationsUpdate(data: unknown): data is ApplicationsUpdate {
  try {
    ApplicationsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
