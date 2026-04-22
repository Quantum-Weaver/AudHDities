// =====================================================
// FILE: lib/validators/generated/prometheus-meta/prometheus_patterns.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.925Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { PrometheusPatternsRow, PrometheusPatternsInsert, PrometheusPatternsUpdate } from '@/types/generated/prometheus-meta/prometheus_patterns';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const PrometheusPatternsRowSchema: z.ZodType<PrometheusPatternsRow> = z.any();
export const PrometheusPatternsInsertSchema: z.ZodType<PrometheusPatternsInsert> = z.any();
export const PrometheusPatternsUpdateSchema: z.ZodType<PrometheusPatternsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const PrometheusPatternsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type PrometheusPatternsRuntimeInput = z.infer<typeof PrometheusPatternsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full prometheus_patterns row
 */
export function validatePrometheusPatternsRow(data: unknown): data is PrometheusPatternsRow {
  try {
    PrometheusPatternsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a prometheus_patterns insert
 */
export function validatePrometheusPatternsInsert(data: unknown): data is PrometheusPatternsInsert {
  try {
    PrometheusPatternsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a prometheus_patterns update
 */
export function validatePrometheusPatternsUpdate(data: unknown): data is PrometheusPatternsUpdate {
  try {
    PrometheusPatternsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
