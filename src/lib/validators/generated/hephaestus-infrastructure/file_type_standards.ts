// =====================================================
// FILE: lib/validators/generated/hephaestus-infrastructure/file_type_standards.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.157Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { FileTypeStandardsRow, FileTypeStandardsInsert, FileTypeStandardsUpdate } from '@/types/generated/hephaestus-infrastructure/file_type_standards';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const FileTypeStandardsRowSchema: z.ZodType<FileTypeStandardsRow> = z.any();
export const FileTypeStandardsInsertSchema: z.ZodType<FileTypeStandardsInsert> = z.any();
export const FileTypeStandardsUpdateSchema: z.ZodType<FileTypeStandardsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const FileTypeStandardsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type FileTypeStandardsRuntimeInput = z.infer<typeof FileTypeStandardsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full file_type_standards row
 */
export function validateFileTypeStandardsRow(data: unknown): data is FileTypeStandardsRow {
  try {
    FileTypeStandardsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a file_type_standards insert
 */
export function validateFileTypeStandardsInsert(data: unknown): data is FileTypeStandardsInsert {
  try {
    FileTypeStandardsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a file_type_standards update
 */
export function validateFileTypeStandardsUpdate(data: unknown): data is FileTypeStandardsUpdate {
  try {
    FileTypeStandardsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
