// =====================================================
// FILE: types/hermes_social/posts.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T18:12:44.771Z
// SOURCE: database.types.ts lines 3145-3219
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type PostsRow = Database['public']['Tables']['posts']['Row'];
export type PostsInsert = Database['public']['Tables']['posts']['Insert'];
export type PostsUpdate = Database['public']['Tables']['posts']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for posts
 * All fields are optional for partial updates
 */
export interface PostsFormData {

}

/**
 * Validation result for posts
 */
export interface PostsValidationResult {
  valid: boolean;
  errors: {

  };
}

