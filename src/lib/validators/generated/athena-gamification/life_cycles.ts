// =====================================================
// FILE: lib/validators/generated/athena-gamification/life_cycles.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.844Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { LifeCyclesRow, LifeCyclesInsert, LifeCyclesUpdate } from '@/types/generated/athena-gamification/life_cycles';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const LifeCyclesRowSchema: z.ZodType<LifeCyclesRow> = z.any();
export const LifeCyclesInsertSchema: z.ZodType<LifeCyclesInsert> = z.any();
export const LifeCyclesUpdateSchema: z.ZodType<LifeCyclesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const LifeCyclesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type LifeCyclesRuntimeInput = z.infer<typeof LifeCyclesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full life_cycles row
 */
export function validateLifeCyclesRow(data: unknown): data is LifeCyclesRow {
  try {
    LifeCyclesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a life_cycles insert
 */
export function validateLifeCyclesInsert(data: unknown): data is LifeCyclesInsert {
  try {
    LifeCyclesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a life_cycles update
 */
export function validateLifeCyclesUpdate(data: unknown): data is LifeCyclesUpdate {
  try {
    LifeCyclesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
