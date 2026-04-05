// =====================================================
// FILE: types/aethelred_connections/chancellor.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.644Z
// SOURCE: database.types.ts lines 749-795
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ChancellorRow = Database['public']['Tables']['chancellor']['Row'];
export type ChancellorInsert = Database['public']['Tables']['chancellor']['Insert'];
export type ChancellorUpdate = Database['public']['Tables']['chancellor']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for chancellor
 * All fields are optional for partial updates
 */
export interface ChancellorFormData {

}

/**
 * Validation result for chancellor
 */
export interface ChancellorValidationResult {
  valid: boolean;
  errors: {

  };
}

