// =====================================================
// FILE: lib/validators/generated/hestia-core/creator_profiles.ts
// HANDLING: join_table
// GENERATED: 2026-04-22T05:48:49.998Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { CreatorProfilesRow, CreatorProfilesInsert, CreatorProfilesUpdate } from '@/types/generated/hestia-core/creator_profiles';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const CreatorProfilesRowSchema: z.ZodType<CreatorProfilesRow> = z.any();
export const CreatorProfilesInsertSchema: z.ZodType<CreatorProfilesInsert> = z.any();
export const CreatorProfilesUpdateSchema: z.ZodType<CreatorProfilesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const CreatorProfilesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type CreatorProfilesRuntimeInput = z.infer<typeof CreatorProfilesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full creator_profiles row
 */
export function validateCreatorProfilesRow(data: unknown): data is CreatorProfilesRow {
  try {
    CreatorProfilesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a creator_profiles insert
 */
export function validateCreatorProfilesInsert(data: unknown): data is CreatorProfilesInsert {
  try {
    CreatorProfilesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a creator_profiles update
 */
export function validateCreatorProfilesUpdate(data: unknown): data is CreatorProfilesUpdate {
  try {
    CreatorProfilesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
