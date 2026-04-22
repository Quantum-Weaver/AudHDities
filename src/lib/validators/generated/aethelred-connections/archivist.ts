// =====================================================
// FILE: lib/validators/generated/aethelred-connections/archivist.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.294Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ArchivistRow, ArchivistInsert, ArchivistUpdate } from '@/types/generated/aethelred-connections/archivist';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ArchivistRowSchema: z.ZodType<ArchivistRow> = z.any();
export const ArchivistInsertSchema: z.ZodType<ArchivistInsert> = z.any();
export const ArchivistUpdateSchema: z.ZodType<ArchivistUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ArchivistRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ArchivistRuntimeInput = z.infer<typeof ArchivistRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full archivist row
 */
export function validateArchivistRow(data: unknown): data is ArchivistRow {
  try {
    ArchivistRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a archivist insert
 */
export function validateArchivistInsert(data: unknown): data is ArchivistInsert {
  try {
    ArchivistInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a archivist update
 */
export function validateArchivistUpdate(data: unknown): data is ArchivistUpdate {
  try {
    ArchivistUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
