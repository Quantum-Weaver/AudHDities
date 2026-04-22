// =====================================================
// FILE: lib/validators/generated/hephaestus-infrastructure/scheduling.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:06.204Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SchedulingRow, SchedulingInsert, SchedulingUpdate } from '@/types/generated/hephaestus-infrastructure/scheduling';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SchedulingRowSchema: z.ZodType<SchedulingRow> = z.any();
export const SchedulingInsertSchema: z.ZodType<SchedulingInsert> = z.any();
export const SchedulingUpdateSchema: z.ZodType<SchedulingUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SchedulingRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SchedulingRuntimeInput = z.infer<typeof SchedulingRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full scheduling row
 */
export function validateSchedulingRow(data: unknown): data is SchedulingRow {
  try {
    SchedulingRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a scheduling insert
 */
export function validateSchedulingInsert(data: unknown): data is SchedulingInsert {
  try {
    SchedulingInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a scheduling update
 */
export function validateSchedulingUpdate(data: unknown): data is SchedulingUpdate {
  try {
    SchedulingUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
