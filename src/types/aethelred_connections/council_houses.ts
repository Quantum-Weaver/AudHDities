// =====================================================
// FILE: types/aethelred_connections/council_houses.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.671Z
// SOURCE: database.types.ts lines 1269-1341
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CouncilHousesRow = Database['public']['Tables']['council_houses']['Row'];
export type CouncilHousesInsert = Database['public']['Tables']['council_houses']['Insert'];
export type CouncilHousesUpdate = Database['public']['Tables']['council_houses']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for council_houses
 * All fields are optional for partial updates
 */
export interface CouncilHousesFormData {

}

/**
 * Validation result for council_houses
 */
export interface CouncilHousesValidationResult {
  valid: boolean;
  errors: {

  };
}

