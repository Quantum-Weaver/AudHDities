// =====================================================
// FILE: lib/validators/generated/aethelred-connections/curator.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.565Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { CuratorRow, CuratorInsert, CuratorUpdate } from '@/types/generated/aethelred-connections/curator';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const CuratorRowSchema: z.ZodType<CuratorRow> = z.any();
export const CuratorInsertSchema: z.ZodType<CuratorInsert> = z.any();
export const CuratorUpdateSchema: z.ZodType<CuratorUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const CuratorRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type CuratorRuntimeInput = z.infer<typeof CuratorRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full curator row
 */
export function validateCuratorRow(data: unknown): data is CuratorRow {
  try {
    CuratorRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a curator insert
 */
export function validateCuratorInsert(data: unknown): data is CuratorInsert {
  try {
    CuratorInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a curator update
 */
export function validateCuratorUpdate(data: unknown): data is CuratorUpdate {
  try {
    CuratorUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
