// =====================================================
// FILE: lib/validators/generated/hestia-core/user_private.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.903Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { UserPrivateRow, UserPrivateInsert, UserPrivateUpdate } from '@/types/generated/hestia-core/user_private';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const UserPrivateRowSchema: z.ZodType<UserPrivateRow> = z.any();
export const UserPrivateInsertSchema: z.ZodType<UserPrivateInsert> = z.any();
export const UserPrivateUpdateSchema: z.ZodType<UserPrivateUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const UserPrivateRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type UserPrivateRuntimeInput = z.infer<typeof UserPrivateRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full user_private row
 */
export function validateUserPrivateRow(data: unknown): data is UserPrivateRow {
  try {
    UserPrivateRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a user_private insert
 */
export function validateUserPrivateInsert(data: unknown): data is UserPrivateInsert {
  try {
    UserPrivateInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a user_private update
 */
export function validateUserPrivateUpdate(data: unknown): data is UserPrivateUpdate {
  try {
    UserPrivateUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
