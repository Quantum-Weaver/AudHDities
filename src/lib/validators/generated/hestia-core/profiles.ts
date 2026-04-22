// =====================================================
// FILE: lib/validators/generated/hestia-core/profiles.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.090Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ProfilesRow, ProfilesInsert, ProfilesUpdate } from '@/types/generated/hestia-core/profiles';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ProfilesRowSchema: z.ZodType<ProfilesRow> = z.any();
export const ProfilesInsertSchema: z.ZodType<ProfilesInsert> = z.any();
export const ProfilesUpdateSchema: z.ZodType<ProfilesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ProfilesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ProfilesRuntimeInput = z.infer<typeof ProfilesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full profiles row
 */
export function validateProfilesRow(data: unknown): data is ProfilesRow {
  try {
    ProfilesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a profiles insert
 */
export function validateProfilesInsert(data: unknown): data is ProfilesInsert {
  try {
    ProfilesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a profiles update
 */
export function validateProfilesUpdate(data: unknown): data is ProfilesUpdate {
  try {
    ProfilesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
