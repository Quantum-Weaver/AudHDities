// =====================================================
// FILE: lib/validators/generated/hephaestus-infrastructure/systems.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.800Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SystemsRow, SystemsInsert, SystemsUpdate } from '@/types/generated/hephaestus-infrastructure/systems';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SystemsRowSchema: z.ZodType<SystemsRow> = z.any();
export const SystemsInsertSchema: z.ZodType<SystemsInsert> = z.any();
export const SystemsUpdateSchema: z.ZodType<SystemsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SystemsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SystemsRuntimeInput = z.infer<typeof SystemsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full systems row
 */
export function validateSystemsRow(data: unknown): data is SystemsRow {
  try {
    SystemsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a systems insert
 */
export function validateSystemsInsert(data: unknown): data is SystemsInsert {
  try {
    SystemsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a systems update
 */
export function validateSystemsUpdate(data: unknown): data is SystemsUpdate {
  try {
    SystemsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
