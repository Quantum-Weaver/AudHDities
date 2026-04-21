// =====================================================
// VALIDATOR: Profiles
// DEITY: hestia-core
// GENERATED: 2026-04-21T02:14:09.774Z
// =====================================================
// NOTE: Runtime validation using Zod with database type inference
// =====================================================

import { z } from 'zod';
import type { ProfilesRow, ProfilesInsert, ProfilesUpdate } from '@/types/generated/hestia-core/profiles';

// Import runtime enums for validation
import { 
  BADGE_TYPE, COUNCIL_HOUSE, SENSORY_MODE, USER_STATUS, USER_TIER 
} from '@/lib/constants/generated/hestia-core';

// =====================================================
// FIELD VALIDATION SCHEMAS
// =====================================================



// =====================================================
// ROW SCHEMA (full database row)
// =====================================================

export const ProfilesRowSchema = z.object({
  username: z.string().nullable(),
});

// =====================================================
// INSERT SCHEMA (for creation - optional fields)
// =====================================================

export const ProfilesInsertSchema = z.object({
  username: z.string().nullable().optional(),
});

// =====================================================
// UPDATE SCHEMA (for updates - all optional)
// =====================================================

export const ProfilesUpdateSchema = z.object({
  username: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ProfilesRowInput = z.infer<typeof ProfilesRowSchema>;
export type ProfilesInsertInput = z.infer<typeof ProfilesInsertSchema>;
export type ProfilesUpdateInput = z.infer<typeof ProfilesUpdateSchema>;

// =====================================================
// VALIDATION HELPERS
// =====================================================

export function validateProfilesRow(data: unknown): ProfilesRowInput {
  return ProfilesRowSchema.parse(data);
}

export function validateProfilesInsert(data: unknown): ProfilesInsertInput {
  return ProfilesInsertSchema.parse(data);
}

export function validateProfilesUpdate(data: unknown): ProfilesUpdateInput {
  return ProfilesUpdateSchema.parse(data);
}

export function safeValidateProfilesInsert(data: unknown): {
  success: boolean;
  data?: ProfilesInsertInput;
  error?: z.ZodError;
} {
  const result = ProfilesInsertSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
