// =====================================================
// FILE: types/hermes_social/reactions.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T18:12:44.800Z
// SOURCE: database.types.ts lines 3729-3797
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ReactionsRow = Database['public']['Tables']['reactions']['Row'];
export type ReactionsInsert = Database['public']['Tables']['reactions']['Insert'];
export type ReactionsUpdate = Database['public']['Tables']['reactions']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for reactions
 * All fields are optional for partial updates
 */
export interface ReactionsFormData {

}

/**
 * Validation result for reactions
 */
export interface ReactionsValidationResult {
  valid: boolean;
  errors: {

  };
}

