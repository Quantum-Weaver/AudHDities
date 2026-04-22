// =====================================================
// FILE: lib/validators/generated/athena-gamification/user_badges.ts
// HANDLING: join_table
// GENERATED: 2026-04-22T04:38:06.535Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { UserBadgesRow, UserBadgesInsert, UserBadgesUpdate } from '@/types/generated/athena-gamification/user_badges';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const UserBadgesRowSchema: z.ZodType<UserBadgesRow> = z.any();
export const UserBadgesInsertSchema: z.ZodType<UserBadgesInsert> = z.any();
export const UserBadgesUpdateSchema: z.ZodType<UserBadgesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const UserBadgesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type UserBadgesRuntimeInput = z.infer<typeof UserBadgesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full user_badges row
 */
export function validateUserBadgesRow(data: unknown): data is UserBadgesRow {
  try {
    UserBadgesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a user_badges insert
 */
export function validateUserBadgesInsert(data: unknown): data is UserBadgesInsert {
  try {
    UserBadgesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a user_badges update
 */
export function validateUserBadgesUpdate(data: unknown): data is UserBadgesUpdate {
  try {
    UserBadgesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
