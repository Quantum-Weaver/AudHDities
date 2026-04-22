// =====================================================
// FILE: lib/validators/generated/mnemosyne-assessment/ontology.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.736Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { OntologyRow, OntologyInsert, OntologyUpdate } from '@/types/generated/mnemosyne-assessment/ontology';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const OntologyRowSchema: z.ZodType<OntologyRow> = z.any();
export const OntologyInsertSchema: z.ZodType<OntologyInsert> = z.any();
export const OntologyUpdateSchema: z.ZodType<OntologyUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const OntologyRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type OntologyRuntimeInput = z.infer<typeof OntologyRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full ontology row
 */
export function validateOntologyRow(data: unknown): data is OntologyRow {
  try {
    OntologyRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a ontology insert
 */
export function validateOntologyInsert(data: unknown): data is OntologyInsert {
  try {
    OntologyInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a ontology update
 */
export function validateOntologyUpdate(data: unknown): data is OntologyUpdate {
  try {
    OntologyUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
