// =====================================================
// FILE: lib/validators/generated/aethelred-connections/github_connection.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.747Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { GithubConnectionRow, GithubConnectionInsert, GithubConnectionUpdate } from '@/types/generated/aethelred-connections/github_connection';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const GithubConnectionRowSchema: z.ZodType<GithubConnectionRow> = z.any();
export const GithubConnectionInsertSchema: z.ZodType<GithubConnectionInsert> = z.any();
export const GithubConnectionUpdateSchema: z.ZodType<GithubConnectionUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const GithubConnectionRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type GithubConnectionRuntimeInput = z.infer<typeof GithubConnectionRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full github_connection row
 */
export function validateGithubConnectionRow(data: unknown): data is GithubConnectionRow {
  try {
    GithubConnectionRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a github_connection insert
 */
export function validateGithubConnectionInsert(data: unknown): data is GithubConnectionInsert {
  try {
    GithubConnectionInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a github_connection update
 */
export function validateGithubConnectionUpdate(data: unknown): data is GithubConnectionUpdate {
  try {
    GithubConnectionUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
