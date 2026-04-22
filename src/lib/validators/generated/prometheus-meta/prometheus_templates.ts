// =====================================================
// FILE: lib/validators/generated/prometheus-meta/prometheus_templates.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.246Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { PrometheusTemplatesRow, PrometheusTemplatesInsert, PrometheusTemplatesUpdate } from '@/types/generated/prometheus-meta/prometheus_templates';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const PrometheusTemplatesRowSchema: z.ZodType<PrometheusTemplatesRow> = z.any();
export const PrometheusTemplatesInsertSchema: z.ZodType<PrometheusTemplatesInsert> = z.any();
export const PrometheusTemplatesUpdateSchema: z.ZodType<PrometheusTemplatesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const PrometheusTemplatesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type PrometheusTemplatesRuntimeInput = z.infer<typeof PrometheusTemplatesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full prometheus_templates row
 */
export function validatePrometheusTemplatesRow(data: unknown): data is PrometheusTemplatesRow {
  try {
    PrometheusTemplatesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a prometheus_templates insert
 */
export function validatePrometheusTemplatesInsert(data: unknown): data is PrometheusTemplatesInsert {
  try {
    PrometheusTemplatesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a prometheus_templates update
 */
export function validatePrometheusTemplatesUpdate(data: unknown): data is PrometheusTemplatesUpdate {
  try {
    PrometheusTemplatesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
