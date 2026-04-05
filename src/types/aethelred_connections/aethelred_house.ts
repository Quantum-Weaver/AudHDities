// =====================================================
// FILE: types/aethelred_connections/aethelred_house.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.619Z
// SOURCE: database.types.ts lines 373-416
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type AethelredHouseRow = Database['public']['Tables']['aethelred_house']['Row'];
export type AethelredHouseInsert = Database['public']['Tables']['aethelred_house']['Insert'];
export type AethelredHouseUpdate = Database['public']['Tables']['aethelred_house']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for aethelred_house
 * All fields are optional for partial updates
 */
export interface AethelredHouseFormData {

}

/**
 * Validation result for aethelred_house
 */
export interface AethelredHouseValidationResult {
  valid: boolean;
  errors: {

  };
}

