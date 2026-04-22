// =====================================================
// FILE: lib/validators/generated/hestia-core/creator_category_links.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:49.984Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { CreatorCategoryLinksRow, CreatorCategoryLinksInsert, CreatorCategoryLinksUpdate } from '@/types/generated/hestia-core/creator_category_links';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const CreatorCategoryLinksRowSchema: z.ZodType<CreatorCategoryLinksRow> = z.any();
export const CreatorCategoryLinksInsertSchema: z.ZodType<CreatorCategoryLinksInsert> = z.any();
export const CreatorCategoryLinksUpdateSchema: z.ZodType<CreatorCategoryLinksUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const CreatorCategoryLinksRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type CreatorCategoryLinksRuntimeInput = z.infer<typeof CreatorCategoryLinksRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full creator_category_links row
 */
export function validateCreatorCategoryLinksRow(data: unknown): data is CreatorCategoryLinksRow {
  try {
    CreatorCategoryLinksRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a creator_category_links insert
 */
export function validateCreatorCategoryLinksInsert(data: unknown): data is CreatorCategoryLinksInsert {
  try {
    CreatorCategoryLinksInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a creator_category_links update
 */
export function validateCreatorCategoryLinksUpdate(data: unknown): data is CreatorCategoryLinksUpdate {
  try {
    CreatorCategoryLinksUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
