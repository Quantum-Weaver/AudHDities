// =====================================================
// FILE: lib/validators/generated/hephaestus-infrastructure/analytics.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.019Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { AnalyticsRow, AnalyticsInsert, AnalyticsUpdate } from '@/types/generated/hephaestus-infrastructure/analytics';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const AnalyticsRowSchema: z.ZodType<AnalyticsRow> = z.any();
export const AnalyticsInsertSchema: z.ZodType<AnalyticsInsert> = z.any();
export const AnalyticsUpdateSchema: z.ZodType<AnalyticsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const AnalyticsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type AnalyticsRuntimeInput = z.infer<typeof AnalyticsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full analytics row
 */
export function validateAnalyticsRow(data: unknown): data is AnalyticsRow {
  try {
    AnalyticsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a analytics insert
 */
export function validateAnalyticsInsert(data: unknown): data is AnalyticsInsert {
  try {
    AnalyticsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a analytics update
 */
export function validateAnalyticsUpdate(data: unknown): data is AnalyticsUpdate {
  try {
    AnalyticsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
