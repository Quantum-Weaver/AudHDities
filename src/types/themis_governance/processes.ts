// =====================================================
// FILE: types/themis_governance/processes.ts
// HANDLING: full_crud
// DEITY: themis_governance
// GENERATED: 2026-04-05T18:12:44.775Z
// SOURCE: database.types.ts lines 3220-3278
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ProcessesRow = Database['public']['Tables']['processes']['Row'];
export type ProcessesInsert = Database['public']['Tables']['processes']['Insert'];
export type ProcessesUpdate = Database['public']['Tables']['processes']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for processes
 * All fields are optional for partial updates
 */
export interface ProcessesFormData {

}

/**
 * Validation result for processes
 */
export interface ProcessesValidationResult {
  valid: boolean;
  errors: {

  };
}

