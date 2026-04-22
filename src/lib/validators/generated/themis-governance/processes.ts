// =====================================================
// FILE: lib/validators/generated/themis-governance/processes.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.055Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ProcessesRow, ProcessesInsert, ProcessesUpdate } from '@/types/generated/themis-governance/processes';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ProcessesRowSchema: z.ZodType<ProcessesRow> = z.any();
export const ProcessesInsertSchema: z.ZodType<ProcessesInsert> = z.any();
export const ProcessesUpdateSchema: z.ZodType<ProcessesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ProcessesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ProcessesRuntimeInput = z.infer<typeof ProcessesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full processes row
 */
export function validateProcessesRow(data: unknown): data is ProcessesRow {
  try {
    ProcessesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a processes insert
 */
export function validateProcessesInsert(data: unknown): data is ProcessesInsert {
  try {
    ProcessesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a processes update
 */
export function validateProcessesUpdate(data: unknown): data is ProcessesUpdate {
  try {
    ProcessesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
