// =====================================================
// FILE: types/hephaestus_infrastructure/systems.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T18:12:44.870Z
// SOURCE: database.types.ts lines 5000-5050
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SystemsRow = Database['public']['Tables']['systems']['Row'];
export type SystemsInsert = Database['public']['Tables']['systems']['Insert'];
export type SystemsUpdate = Database['public']['Tables']['systems']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for systems
 * All fields are optional for partial updates
 */
export interface SystemsFormData {

}

/**
 * Validation result for systems
 */
export interface SystemsValidationResult {
  valid: boolean;
  errors: {

  };
}

