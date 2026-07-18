// =====================================================
// FILE: types/generated/mnemosyne-assessment/family.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:30:03.718Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type FamilyRow = Tables<'family'>;
export type FamilyInsert = TablesInsert<'family'>;
export type FamilyUpdate = TablesUpdate<'family'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of family
 */
export interface PublicFamily {
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  keyword_id: string | null;
  name: string;
  order_id: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for family
 * All fields are optional for partial updates
 */
export interface FamilyFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  keyword_id?: string | null;
  name?: string;
  order_id?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for family
 */
export interface FamilyValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    keyword_id?: string;
    name?: string;
    order_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

