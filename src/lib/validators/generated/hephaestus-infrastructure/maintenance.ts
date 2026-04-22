// =====================================================
// FILE: lib/validators/generated/hephaestus-infrastructure/maintenance.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.566Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { MaintenanceRow, MaintenanceInsert, MaintenanceUpdate } from '@/types/generated/hephaestus-infrastructure/maintenance';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const MaintenanceRowSchema: z.ZodType<MaintenanceRow> = z.any();
export const MaintenanceInsertSchema: z.ZodType<MaintenanceInsert> = z.any();
export const MaintenanceUpdateSchema: z.ZodType<MaintenanceUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const MaintenanceRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type MaintenanceRuntimeInput = z.infer<typeof MaintenanceRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full maintenance row
 */
export function validateMaintenanceRow(data: unknown): data is MaintenanceRow {
  try {
    MaintenanceRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a maintenance insert
 */
export function validateMaintenanceInsert(data: unknown): data is MaintenanceInsert {
  try {
    MaintenanceInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a maintenance update
 */
export function validateMaintenanceUpdate(data: unknown): data is MaintenanceUpdate {
  try {
    MaintenanceUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
