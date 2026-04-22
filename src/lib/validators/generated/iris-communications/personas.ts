// =====================================================
// FILE: lib/validators/generated/iris-communications/personas.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.016Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { PersonasRow, PersonasInsert, PersonasUpdate } from '@/types/generated/iris-communications/personas';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const PersonasRowSchema: z.ZodType<PersonasRow> = z.any();
export const PersonasInsertSchema: z.ZodType<PersonasInsert> = z.any();
export const PersonasUpdateSchema: z.ZodType<PersonasUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const PersonasRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type PersonasRuntimeInput = z.infer<typeof PersonasRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full personas row
 */
export function validatePersonasRow(data: unknown): data is PersonasRow {
  try {
    PersonasRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a personas insert
 */
export function validatePersonasInsert(data: unknown): data is PersonasInsert {
  try {
    PersonasInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a personas update
 */
export function validatePersonasUpdate(data: unknown): data is PersonasUpdate {
  try {
    PersonasUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
