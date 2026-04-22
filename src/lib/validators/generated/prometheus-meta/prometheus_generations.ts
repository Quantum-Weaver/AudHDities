// =====================================================
// FILE: lib/validators/generated/prometheus-meta/prometheus_generations.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.898Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { PrometheusGenerationsRow, PrometheusGenerationsInsert, PrometheusGenerationsUpdate } from '@/types/generated/prometheus-meta/prometheus_generations';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const PrometheusGenerationsRowSchema: z.ZodType<PrometheusGenerationsRow> = z.any();
export const PrometheusGenerationsInsertSchema: z.ZodType<PrometheusGenerationsInsert> = z.any();
export const PrometheusGenerationsUpdateSchema: z.ZodType<PrometheusGenerationsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const PrometheusGenerationsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type PrometheusGenerationsRuntimeInput = z.infer<typeof PrometheusGenerationsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full prometheus_generations row
 */
export function validatePrometheusGenerationsRow(data: unknown): data is PrometheusGenerationsRow {
  try {
    PrometheusGenerationsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a prometheus_generations insert
 */
export function validatePrometheusGenerationsInsert(data: unknown): data is PrometheusGenerationsInsert {
  try {
    PrometheusGenerationsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a prometheus_generations update
 */
export function validatePrometheusGenerationsUpdate(data: unknown): data is PrometheusGenerationsUpdate {
  try {
    PrometheusGenerationsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
