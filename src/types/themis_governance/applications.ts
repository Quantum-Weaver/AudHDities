// =====================================================
// FILE: types/themis_governance/applications.ts
// HANDLING: full_crud
// DEITY: themis_governance
// GENERATED: 2026-04-05T18:12:44.626Z
// SOURCE: database.types.ts lines 464-526
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ApplicationsRow = Database['public']['Tables']['applications']['Row'];
export type ApplicationsInsert = Database['public']['Tables']['applications']['Insert'];
export type ApplicationsUpdate = Database['public']['Tables']['applications']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for applications
 * All fields are optional for partial updates
 */
export interface ApplicationsFormData {

}

/**
 * Validation result for applications
 */
export interface ApplicationsValidationResult {
  valid: boolean;
  errors: {

  };
}

