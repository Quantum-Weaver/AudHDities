// =====================================================
// FILE: lib/validators/generated/prometheus-meta/prometheus_blueprints.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.131Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { PrometheusBlueprintsRow, PrometheusBlueprintsInsert, PrometheusBlueprintsUpdate } from '@/types/generated/prometheus-meta/prometheus_blueprints';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const PrometheusBlueprintsRowSchema: z.ZodType<PrometheusBlueprintsRow> = z.any();
export const PrometheusBlueprintsInsertSchema: z.ZodType<PrometheusBlueprintsInsert> = z.any();
export const PrometheusBlueprintsUpdateSchema: z.ZodType<PrometheusBlueprintsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const PrometheusBlueprintsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type PrometheusBlueprintsRuntimeInput = z.infer<typeof PrometheusBlueprintsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full prometheus_blueprints row
 */
export function validatePrometheusBlueprintsRow(data: unknown): data is PrometheusBlueprintsRow {
  try {
    PrometheusBlueprintsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a prometheus_blueprints insert
 */
export function validatePrometheusBlueprintsInsert(data: unknown): data is PrometheusBlueprintsInsert {
  try {
    PrometheusBlueprintsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a prometheus_blueprints update
 */
export function validatePrometheusBlueprintsUpdate(data: unknown): data is PrometheusBlueprintsUpdate {
  try {
    PrometheusBlueprintsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
