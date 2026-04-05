// =====================================================
// FILE: types/iris_communications/personas.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T18:12:44.768Z
// SOURCE: database.types.ts lines 3095-3144
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type PersonasRow = Database['public']['Tables']['personas']['Row'];
export type PersonasInsert = Database['public']['Tables']['personas']['Insert'];
export type PersonasUpdate = Database['public']['Tables']['personas']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for personas
 * All fields are optional for partial updates
 */
export interface PersonasFormData {

}

/**
 * Validation result for personas
 */
export interface PersonasValidationResult {
  valid: boolean;
  errors: {

  };
}

