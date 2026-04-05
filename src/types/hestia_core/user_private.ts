// =====================================================
// FILE: types/hestia_core/user_private.ts
// HANDLING: full_crud
// DEITY: hestia_core
// GENERATED: 2026-04-05T18:12:44.893Z
// SOURCE: database.types.ts lines 5392-5441
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type UserPrivateRow = Database['public']['Tables']['user_private']['Row'];
export type UserPrivateInsert = Database['public']['Tables']['user_private']['Insert'];
export type UserPrivateUpdate = Database['public']['Tables']['user_private']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for user_private
 * All fields are optional for partial updates
 */
export interface UserPrivateFormData {

}

/**
 * Validation result for user_private
 */
export interface UserPrivateValidationResult {
  valid: boolean;
  errors: {

  };
}

