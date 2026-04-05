// =====================================================
// FILE: types/hermes_social/replies.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T18:12:44.805Z
// SOURCE: database.types.ts lines 3848-3895
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type RepliesRow = Database['public']['Tables']['replies']['Row'];
export type RepliesInsert = Database['public']['Tables']['replies']['Insert'];
export type RepliesUpdate = Database['public']['Tables']['replies']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for replies
 * All fields are optional for partial updates
 */
export interface RepliesFormData {

}

/**
 * Validation result for replies
 */
export interface RepliesValidationResult {
  valid: boolean;
  errors: {

  };
}

