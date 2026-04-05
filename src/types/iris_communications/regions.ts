// =====================================================
// FILE: types/iris_communications/regions.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T18:12:44.802Z
// SOURCE: database.types.ts lines 3798-3847
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type RegionsRow = Database['public']['Tables']['regions']['Row'];
export type RegionsInsert = Database['public']['Tables']['regions']['Insert'];
export type RegionsUpdate = Database['public']['Tables']['regions']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for regions
 * All fields are optional for partial updates
 */
export interface RegionsFormData {

}

/**
 * Validation result for regions
 */
export interface RegionsValidationResult {
  valid: boolean;
  errors: {

  };
}

