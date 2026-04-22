// =====================================================
// FILE: lib/validators/generated/prometheus-meta/prometheus_boundaries.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.153Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { PrometheusBoundariesRow, PrometheusBoundariesInsert, PrometheusBoundariesUpdate } from '@/types/generated/prometheus-meta/prometheus_boundaries';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const PrometheusBoundariesRowSchema: z.ZodType<PrometheusBoundariesRow> = z.any();
export const PrometheusBoundariesInsertSchema: z.ZodType<PrometheusBoundariesInsert> = z.any();
export const PrometheusBoundariesUpdateSchema: z.ZodType<PrometheusBoundariesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const PrometheusBoundariesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type PrometheusBoundariesRuntimeInput = z.infer<typeof PrometheusBoundariesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full prometheus_boundaries row
 */
export function validatePrometheusBoundariesRow(data: unknown): data is PrometheusBoundariesRow {
  try {
    PrometheusBoundariesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a prometheus_boundaries insert
 */
export function validatePrometheusBoundariesInsert(data: unknown): data is PrometheusBoundariesInsert {
  try {
    PrometheusBoundariesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a prometheus_boundaries update
 */
export function validatePrometheusBoundariesUpdate(data: unknown): data is PrometheusBoundariesUpdate {
  try {
    PrometheusBoundariesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
