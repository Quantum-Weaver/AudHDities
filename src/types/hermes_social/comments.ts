// =====================================================
// FILE: types/hermes_social/comments.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T18:12:44.653Z
// SOURCE: database.types.ts lines 902-959
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CommentsRow = Database['public']['Tables']['comments']['Row'];
export type CommentsInsert = Database['public']['Tables']['comments']['Insert'];
export type CommentsUpdate = Database['public']['Tables']['comments']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for comments
 * All fields are optional for partial updates
 */
export interface CommentsFormData {

}

/**
 * Validation result for comments
 */
export interface CommentsValidationResult {
  valid: boolean;
  errors: {

  };
}

