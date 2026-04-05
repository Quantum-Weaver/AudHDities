// =====================================================
// FILE: types/hephaestus_infrastructure/protocols.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T18:12:44.787Z
// SOURCE: database.types.ts lines 3526-3597
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ProtocolsRow = Database['public']['Tables']['protocols']['Row'];
export type ProtocolsInsert = Database['public']['Tables']['protocols']['Insert'];
export type ProtocolsUpdate = Database['public']['Tables']['protocols']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for protocols
 * All fields are optional for partial updates
 */
export interface ProtocolsFormData {

}

/**
 * Validation result for protocols
 */
export interface ProtocolsValidationResult {
  valid: boolean;
  errors: {

  };
}

