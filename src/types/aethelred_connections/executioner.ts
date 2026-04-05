// =====================================================
// FILE: types/aethelred_connections/executioner.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.707Z
// SOURCE: database.types.ts lines 1971-2014
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ExecutionerRow = Database['public']['Tables']['executioner']['Row'];
export type ExecutionerInsert = Database['public']['Tables']['executioner']['Insert'];
export type ExecutionerUpdate = Database['public']['Tables']['executioner']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for executioner
 * All fields are optional for partial updates
 */
export interface ExecutionerFormData {

}

/**
 * Validation result for executioner
 */
export interface ExecutionerValidationResult {
  valid: boolean;
  errors: {

  };
}

