// =====================================================
// FILE: lib/validators/generated/aethelred-connections/codex.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.381Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { CodexRow, CodexInsert, CodexUpdate } from '@/types/generated/aethelred-connections/codex';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const CodexRowSchema: z.ZodType<CodexRow> = z.any();
export const CodexInsertSchema: z.ZodType<CodexInsert> = z.any();
export const CodexUpdateSchema: z.ZodType<CodexUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const CodexRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type CodexRuntimeInput = z.infer<typeof CodexRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full codex row
 */
export function validateCodexRow(data: unknown): data is CodexRow {
  try {
    CodexRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a codex insert
 */
export function validateCodexInsert(data: unknown): data is CodexInsert {
  try {
    CodexInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a codex update
 */
export function validateCodexUpdate(data: unknown): data is CodexUpdate {
  try {
    CodexUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
