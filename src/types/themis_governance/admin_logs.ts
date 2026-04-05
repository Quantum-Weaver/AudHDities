// =====================================================
// FILE: types/themis_governance/admin_logs.ts
// HANDLING: full_crud
// DEITY: themis_governance
// GENERATED: 2026-04-05T18:12:44.611Z
// SOURCE: database.types.ts lines 237-313
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type AdminLogsRow = Database['public']['Tables']['admin_logs']['Row'];
export type AdminLogsInsert = Database['public']['Tables']['admin_logs']['Insert'];
export type AdminLogsUpdate = Database['public']['Tables']['admin_logs']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for admin_logs
 * All fields are optional for partial updates
 */
export interface AdminLogsFormData {

}

/**
 * Validation result for admin_logs
 */
export interface AdminLogsValidationResult {
  valid: boolean;
  errors: {

  };
}

