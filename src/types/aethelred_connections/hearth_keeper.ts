// =====================================================
// FILE: types/aethelred_connections/hearth_keeper.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.723Z
// SOURCE: database.types.ts lines 2269-2315
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type HearthKeeperRow = Database['public']['Tables']['hearth_keeper']['Row'];
export type HearthKeeperInsert = Database['public']['Tables']['hearth_keeper']['Insert'];
export type HearthKeeperUpdate = Database['public']['Tables']['hearth_keeper']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for hearth_keeper
 * All fields are optional for partial updates
 */
export interface HearthKeeperFormData {

}

/**
 * Validation result for hearth_keeper
 */
export interface HearthKeeperValidationResult {
  valid: boolean;
  errors: {

  };
}

