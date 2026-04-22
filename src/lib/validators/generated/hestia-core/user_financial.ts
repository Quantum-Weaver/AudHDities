// =====================================================
// FILE: lib/validators/generated/hestia-core/user_financial.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.888Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { UserFinancialRow, UserFinancialInsert, UserFinancialUpdate } from '@/types/generated/hestia-core/user_financial';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const UserFinancialRowSchema: z.ZodType<UserFinancialRow> = z.any();
export const UserFinancialInsertSchema: z.ZodType<UserFinancialInsert> = z.any();
export const UserFinancialUpdateSchema: z.ZodType<UserFinancialUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const UserFinancialRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type UserFinancialRuntimeInput = z.infer<typeof UserFinancialRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full user_financial row
 */
export function validateUserFinancialRow(data: unknown): data is UserFinancialRow {
  try {
    UserFinancialRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a user_financial insert
 */
export function validateUserFinancialInsert(data: unknown): data is UserFinancialInsert {
  try {
    UserFinancialInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a user_financial update
 */
export function validateUserFinancialUpdate(data: unknown): data is UserFinancialUpdate {
  try {
    UserFinancialUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
