// =====================================================
// FILE: types/generated/mnemosyne-assessment/class.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:17:10.673Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ClassRow = Tables<'class'>;
export type ClassInsert = TablesInsert<'class'>;
export type ClassUpdate = TablesUpdate<'class'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of class
 */
export interface PublicClass {
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  keyword_id: string | null;
  name: string;
  phylum_id: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for class
 * All fields are optional for partial updates
 */
export interface ClassFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  keyword_id?: string | null;
  name?: string;
  phylum_id?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for class
 */
export interface ClassValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    keyword_id?: string;
    name?: string;
    phylum_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

