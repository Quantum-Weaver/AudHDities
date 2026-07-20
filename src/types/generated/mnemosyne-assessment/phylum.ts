// =====================================================
// FILE: types/generated/mnemosyne-assessment/phylum.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-20T04:39:10.734Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type PhylumRow = Tables<'phylum'>;
export type PhylumInsert = TablesInsert<'phylum'>;
export type PhylumUpdate = TablesUpdate<'phylum'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of phylum
 */
export interface PublicPhylum {
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  keyword_id: string | null;
  kingdom_id: string | null;
  name: string;
  pk_pattern: string | null;
  rls_pattern: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for phylum
 * All fields are optional for partial updates
 */
export interface PhylumFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  keyword_id?: string | null;
  kingdom_id?: string | null;
  name?: string;
  pk_pattern?: string | null;
  rls_pattern?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for phylum
 */
export interface PhylumValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    keyword_id?: string;
    kingdom_id?: string;
    name?: string;
    pk_pattern?: string;
    rls_pattern?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

