// =====================================================
// FILE: types/athena_gamification/badges.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T18:12:44.638Z
// SOURCE: database.types.ts lines 639-686
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type BadgesRow = Database['public']['Tables']['badges']['Row'];
export type BadgesInsert = Database['public']['Tables']['badges']['Insert'];
export type BadgesUpdate = Database['public']['Tables']['badges']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for badges
 * All fields are optional for partial updates
 */
export interface BadgesFormData {

}

/**
 * Validation result for badges
 */
export interface BadgesValidationResult {
  valid: boolean;
  errors: {

  };
}

