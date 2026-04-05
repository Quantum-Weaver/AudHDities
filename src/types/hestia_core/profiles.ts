// =====================================================
// FILE: types/hestia_core/profiles.ts
// HANDLING: full_crud
// DEITY: hestia_core
// GENERATED: 2026-04-05T18:12:44.781Z
// SOURCE: database.types.ts lines 3393-3455
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ProfilesRow = Database['public']['Tables']['profiles']['Row'];
export type ProfilesInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfilesUpdate = Database['public']['Tables']['profiles']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for profiles
 * All fields are optional for partial updates
 */
export interface ProfilesFormData {

}

/**
 * Validation result for profiles
 */
export interface ProfilesValidationResult {
  valid: boolean;
  errors: {

  };
}

