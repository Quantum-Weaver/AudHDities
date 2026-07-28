// =====================================================
// FILE: types/generated/hestia-core/vessel_sigils.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-28T15:33:50.110Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type VesselSigilsRow = Tables<'vessel_sigils'>;
export type VesselSigilsInsert = TablesInsert<'vessel_sigils'>;
export type VesselSigilsUpdate = TablesUpdate<'vessel_sigils'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vessel_sigils
 */
export interface PublicVesselSigils {
  award_context: Json | null;
  awarded_at: string;
  awarded_by: string | null;
  created_at: string;
  id: string;
  is_displayed: boolean;
  sigil_id: string;
  updated_at: string;
  user_id: string;
}

/**
 * Form data for vessel_sigils
 * All fields are optional for partial updates
 */
export interface VesselSigilsFormData {
  award_context?: Json | null;
  awarded_at?: string;
  awarded_by?: string | null;
  created_at?: string;
  id?: string;
  is_displayed?: boolean;
  sigil_id?: string;
  updated_at?: string;
  user_id?: string;
}

/**
 * Validation result for vessel_sigils
 */
export interface VesselSigilsValidationResult {
  valid: boolean;
  errors: {
    award_context?: string;
    awarded_at?: string;
    awarded_by?: string;
    created_at?: string;
    id?: string;
    is_displayed?: string;
    sigil_id?: string;
    updated_at?: string;
    user_id?: string;
  };
}

