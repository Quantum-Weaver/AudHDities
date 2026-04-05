// =====================================================
// FILE: types/mnemosyne_assessment/folksonomy.ts
// HANDLING: full_crud
// DEITY: mnemosyne_assessment
// GENERATED: 2026-04-05T18:12:44.716Z
// SOURCE: database.types.ts lines 2155-2205
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type FolksonomyRow = Database['public']['Tables']['folksonomy']['Row'];
export type FolksonomyInsert = Database['public']['Tables']['folksonomy']['Insert'];
export type FolksonomyUpdate = Database['public']['Tables']['folksonomy']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for folksonomy
 * All fields are optional for partial updates
 */
export interface FolksonomyFormData {

}

/**
 * Validation result for folksonomy
 */
export interface FolksonomyValidationResult {
  valid: boolean;
  errors: {

  };
}

