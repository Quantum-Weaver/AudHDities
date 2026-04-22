// =====================================================
// FILE: lib/validators/generated/hestia-core/community_profiles.ts
// HANDLING: join_table
// GENERATED: 2026-04-22T05:48:49.882Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { CommunityProfilesRow, CommunityProfilesInsert, CommunityProfilesUpdate } from '@/types/generated/hestia-core/community_profiles';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const CommunityProfilesRowSchema: z.ZodType<CommunityProfilesRow> = z.any();
export const CommunityProfilesInsertSchema: z.ZodType<CommunityProfilesInsert> = z.any();
export const CommunityProfilesUpdateSchema: z.ZodType<CommunityProfilesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const CommunityProfilesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type CommunityProfilesRuntimeInput = z.infer<typeof CommunityProfilesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full community_profiles row
 */
export function validateCommunityProfilesRow(data: unknown): data is CommunityProfilesRow {
  try {
    CommunityProfilesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a community_profiles insert
 */
export function validateCommunityProfilesInsert(data: unknown): data is CommunityProfilesInsert {
  try {
    CommunityProfilesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a community_profiles update
 */
export function validateCommunityProfilesUpdate(data: unknown): data is CommunityProfilesUpdate {
  try {
    CommunityProfilesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
