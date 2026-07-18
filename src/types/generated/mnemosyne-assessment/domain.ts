// =====================================================
// FILE: types/generated/mnemosyne-assessment/domain.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:30:03.685Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type DomainRow = Tables<'domain'>;
export type DomainInsert = TablesInsert<'domain'>;
export type DomainUpdate = TablesUpdate<'domain'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of domain
 */
export interface PublicDomain {
  created_at: string;
  created_by: string | null;
  deity_name: string | null;
  description: string | null;
  id: string;
  keyword_id: string | null;
  name: string;
  temperature: number | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for domain
 * All fields are optional for partial updates
 */
export interface DomainFormData {
  created_at?: string;
  created_by?: string | null;
  deity_name?: string | null;
  description?: string | null;
  id?: string;
  keyword_id?: string | null;
  name?: string;
  temperature?: number | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for domain
 */
export interface DomainValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    deity_name?: string;
    description?: string;
    id?: string;
    keyword_id?: string;
    name?: string;
    temperature?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

