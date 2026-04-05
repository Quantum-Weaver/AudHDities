// =====================================================
// FILE: types/athena_gamification/mythology.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T18:12:44.753Z
// SOURCE: database.types.ts lines 2818-2877
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type MythologyRow = Database['public']['Tables']['mythology']['Row'];
export type MythologyInsert = Database['public']['Tables']['mythology']['Insert'];
export type MythologyUpdate = Database['public']['Tables']['mythology']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for mythology
 * All fields are optional for partial updates
 */
export interface MythologyFormData {

}

/**
 * Validation result for mythology
 */
export interface MythologyValidationResult {
  valid: boolean;
  errors: {

  };
}

