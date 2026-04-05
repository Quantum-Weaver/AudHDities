// =====================================================
// FILE: types/hephaestus_infrastructure/scripts.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T18:12:44.835Z
// SOURCE: database.types.ts lines 4446-4504
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ScriptsRow = Database['public']['Tables']['scripts']['Row'];
export type ScriptsInsert = Database['public']['Tables']['scripts']['Insert'];
export type ScriptsUpdate = Database['public']['Tables']['scripts']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for scripts
 * All fields are optional for partial updates
 */
export interface ScriptsFormData {

}

/**
 * Validation result for scripts
 */
export interface ScriptsValidationResult {
  valid: boolean;
  errors: {

  };
}

