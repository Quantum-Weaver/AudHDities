// =====================================================
// FILE: types/hephaestus_infrastructure/maintenance.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T18:12:44.744Z
// SOURCE: database.types.ts lines 2632-2693
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type MaintenanceRow = Database['public']['Tables']['maintenance']['Row'];
export type MaintenanceInsert = Database['public']['Tables']['maintenance']['Insert'];
export type MaintenanceUpdate = Database['public']['Tables']['maintenance']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for maintenance
 * All fields are optional for partial updates
 */
export interface MaintenanceFormData {

}

/**
 * Validation result for maintenance
 */
export interface MaintenanceValidationResult {
  valid: boolean;
  errors: {

  };
}

