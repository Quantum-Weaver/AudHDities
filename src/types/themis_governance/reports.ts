// =====================================================
// FILE: types/themis_governance/reports.ts
// HANDLING: full_crud
// DEITY: themis_governance
// GENERATED: 2026-04-05T18:12:44.809Z
// SOURCE: database.types.ts lines 3896-3974
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ReportsRow = Database['public']['Tables']['reports']['Row'];
export type ReportsInsert = Database['public']['Tables']['reports']['Insert'];
export type ReportsUpdate = Database['public']['Tables']['reports']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for reports
 * All fields are optional for partial updates
 */
export interface ReportsFormData {

}

/**
 * Validation result for reports
 */
export interface ReportsValidationResult {
  valid: boolean;
  errors: {

  };
}

