// =====================================================
// FILE: types/aethelred_connections/seer.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.838Z
// SOURCE: database.types.ts lines 4505-4548
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SeerRow = Database['public']['Tables']['seer']['Row'];
export type SeerInsert = Database['public']['Tables']['seer']['Insert'];
export type SeerUpdate = Database['public']['Tables']['seer']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for seer
 * All fields are optional for partial updates
 */
export interface SeerFormData {

}

/**
 * Validation result for seer
 */
export interface SeerValidationResult {
  valid: boolean;
  errors: {

  };
}

