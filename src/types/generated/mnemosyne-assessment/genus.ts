// =====================================================
// FILE: types/generated/mnemosyne-assessment/genus.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:30:03.766Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type GenusRow = Tables<'genus'>;
export type GenusInsert = TablesInsert<'genus'>;
export type GenusUpdate = TablesUpdate<'genus'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of genus
 */
export interface PublicGenus {
  created_at: string;
  created_by: string | null;
  description: string | null;
  family_id: string | null;
  id: string;
  keyword_id: string | null;
  name: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for genus
 * All fields are optional for partial updates
 */
export interface GenusFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  family_id?: string | null;
  id?: string;
  keyword_id?: string | null;
  name?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for genus
 */
export interface GenusValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    family_id?: string;
    id?: string;
    keyword_id?: string;
    name?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

