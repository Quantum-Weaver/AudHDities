// =====================================================
// FILE: lib/validators/generated/hephaestus-infrastructure/script_execution_logs.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.810Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ScriptExecutionLogsRow, ScriptExecutionLogsInsert, ScriptExecutionLogsUpdate } from '@/types/generated/hephaestus-infrastructure/script_execution_logs';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ScriptExecutionLogsRowSchema: z.ZodType<ScriptExecutionLogsRow> = z.any();
export const ScriptExecutionLogsInsertSchema: z.ZodType<ScriptExecutionLogsInsert> = z.any();
export const ScriptExecutionLogsUpdateSchema: z.ZodType<ScriptExecutionLogsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ScriptExecutionLogsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ScriptExecutionLogsRuntimeInput = z.infer<typeof ScriptExecutionLogsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full script_execution_logs row
 */
export function validateScriptExecutionLogsRow(data: unknown): data is ScriptExecutionLogsRow {
  try {
    ScriptExecutionLogsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a script_execution_logs insert
 */
export function validateScriptExecutionLogsInsert(data: unknown): data is ScriptExecutionLogsInsert {
  try {
    ScriptExecutionLogsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a script_execution_logs update
 */
export function validateScriptExecutionLogsUpdate(data: unknown): data is ScriptExecutionLogsUpdate {
  try {
    ScriptExecutionLogsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
