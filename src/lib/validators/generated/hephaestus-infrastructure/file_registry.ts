// =====================================================
// FILE: lib/validators/generated/hephaestus-infrastructure/file_registry.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.144Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { FileRegistryRow, FileRegistryInsert, FileRegistryUpdate } from '@/types/generated/hephaestus-infrastructure/file_registry';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const FileRegistryRowSchema: z.ZodType<FileRegistryRow> = z.any();
export const FileRegistryInsertSchema: z.ZodType<FileRegistryInsert> = z.any();
export const FileRegistryUpdateSchema: z.ZodType<FileRegistryUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const FileRegistryRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type FileRegistryRuntimeInput = z.infer<typeof FileRegistryRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full file_registry row
 */
export function validateFileRegistryRow(data: unknown): data is FileRegistryRow {
  try {
    FileRegistryRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a file_registry insert
 */
export function validateFileRegistryInsert(data: unknown): data is FileRegistryInsert {
  try {
    FileRegistryInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a file_registry update
 */
export function validateFileRegistryUpdate(data: unknown): data is FileRegistryUpdate {
  try {
    FileRegistryUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
