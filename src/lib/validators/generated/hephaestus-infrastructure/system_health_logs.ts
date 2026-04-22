// =====================================================
// FILE: lib/validators/generated/hephaestus-infrastructure/system_health_logs.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:06.415Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SystemHealthLogsRow, SystemHealthLogsInsert, SystemHealthLogsUpdate } from '@/types/generated/hephaestus-infrastructure/system_health_logs';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SystemHealthLogsRowSchema: z.ZodType<SystemHealthLogsRow> = z.any();
export const SystemHealthLogsInsertSchema: z.ZodType<SystemHealthLogsInsert> = z.any();
export const SystemHealthLogsUpdateSchema: z.ZodType<SystemHealthLogsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SystemHealthLogsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SystemHealthLogsRuntimeInput = z.infer<typeof SystemHealthLogsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full system_health_logs row
 */
export function validateSystemHealthLogsRow(data: unknown): data is SystemHealthLogsRow {
  try {
    SystemHealthLogsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a system_health_logs insert
 */
export function validateSystemHealthLogsInsert(data: unknown): data is SystemHealthLogsInsert {
  try {
    SystemHealthLogsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a system_health_logs update
 */
export function validateSystemHealthLogsUpdate(data: unknown): data is SystemHealthLogsUpdate {
  try {
    SystemHealthLogsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
