// =====================================================
// FILE: types/generated/mnemosyne-assessment/kingdom.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T21:42:54.260Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type KingdomRow = Tables<'kingdom'>;
export type KingdomInsert = TablesInsert<'kingdom'>;
export type KingdomUpdate = TablesUpdate<'kingdom'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of kingdom
 */
export interface PublicKingdom {
  created_at: string;
  created_by: string | null;
  description: string | null;
  domain_id: string | null;
  id: string;
  keyword_id: string | null;
  name: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for kingdom
 * All fields are optional for partial updates
 */
export interface KingdomFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  domain_id?: string | null;
  id?: string;
  keyword_id?: string | null;
  name?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for kingdom
 */
export interface KingdomValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    domain_id?: string;
    id?: string;
    keyword_id?: string;
    name?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

