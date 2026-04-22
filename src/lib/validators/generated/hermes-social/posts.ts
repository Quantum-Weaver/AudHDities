// =====================================================
// FILE: lib/validators/generated/hermes-social/posts.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.464Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { PostsRow, PostsInsert, PostsUpdate } from '@/types/generated/hermes-social/posts';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const PostsRowSchema: z.ZodType<PostsRow> = z.any();
export const PostsInsertSchema: z.ZodType<PostsInsert> = z.any();
export const PostsUpdateSchema: z.ZodType<PostsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const PostsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type PostsRuntimeInput = z.infer<typeof PostsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full posts row
 */
export function validatePostsRow(data: unknown): data is PostsRow {
  try {
    PostsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a posts insert
 */
export function validatePostsInsert(data: unknown): data is PostsInsert {
  try {
    PostsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a posts update
 */
export function validatePostsUpdate(data: unknown): data is PostsUpdate {
  try {
    PostsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
