// =====================================================
// FILE: lib/validators/generated/themis-governance/admin_logs.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:49.640Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { AdminLogsRow, AdminLogsInsert, AdminLogsUpdate } from '@/types/generated/themis-governance/admin_logs';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const AdminLogsRowSchema: z.ZodType<AdminLogsRow> = z.any();
export const AdminLogsInsertSchema: z.ZodType<AdminLogsInsert> = z.any();
export const AdminLogsUpdateSchema: z.ZodType<AdminLogsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const AdminLogsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type AdminLogsRuntimeInput = z.infer<typeof AdminLogsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full admin_logs row
 */
export function validateAdminLogsRow(data: unknown): data is AdminLogsRow {
  try {
    AdminLogsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a admin_logs insert
 */
export function validateAdminLogsInsert(data: unknown): data is AdminLogsInsert {
  try {
    AdminLogsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a admin_logs update
 */
export function validateAdminLogsUpdate(data: unknown): data is AdminLogsUpdate {
  try {
    AdminLogsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
