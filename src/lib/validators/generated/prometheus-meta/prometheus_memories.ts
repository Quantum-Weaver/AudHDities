// =====================================================
// FILE: lib/validators/generated/prometheus-meta/prometheus_memories.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.212Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { PrometheusMemoriesRow, PrometheusMemoriesInsert, PrometheusMemoriesUpdate } from '@/types/generated/prometheus-meta/prometheus_memories';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const PrometheusMemoriesRowSchema: z.ZodType<PrometheusMemoriesRow> = z.any();
export const PrometheusMemoriesInsertSchema: z.ZodType<PrometheusMemoriesInsert> = z.any();
export const PrometheusMemoriesUpdateSchema: z.ZodType<PrometheusMemoriesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const PrometheusMemoriesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type PrometheusMemoriesRuntimeInput = z.infer<typeof PrometheusMemoriesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full prometheus_memories row
 */
export function validatePrometheusMemoriesRow(data: unknown): data is PrometheusMemoriesRow {
  try {
    PrometheusMemoriesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a prometheus_memories insert
 */
export function validatePrometheusMemoriesInsert(data: unknown): data is PrometheusMemoriesInsert {
  try {
    PrometheusMemoriesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a prometheus_memories update
 */
export function validatePrometheusMemoriesUpdate(data: unknown): data is PrometheusMemoriesUpdate {
  try {
    PrometheusMemoriesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
