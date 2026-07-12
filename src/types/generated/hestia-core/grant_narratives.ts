// =====================================================
// FILE: types/generated/hestia-core/grant_narratives.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.501Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type GrantNarrativesRow = Tables<'grant_narratives'>;
export type GrantNarrativesInsert = TablesInsert<'grant_narratives'>;
export type GrantNarrativesUpdate = TablesUpdate<'grant_narratives'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of grant_narratives
 */
export interface PublicGrantNarratives {
  body: string | null;
  created_at: string;
  created_by: string;
  id: string;
  is_default: boolean;
  name: string;
  narrative_type: string | null;
  status: ContentStatus;
  tags: string[] | null;
  updated_at: string;
  updated_by: string | null;
  word_count: number | null;
}

/**
 * Form data for grant_narratives
 * All fields are optional for partial updates
 */
export interface GrantNarrativesFormData {
  body?: string | null;
  created_at?: string;
  created_by?: string;
  id?: string;
  is_default?: boolean;
  name?: string;
  narrative_type?: string | null;
  status?: ContentStatus;
  tags?: string[] | null;
  updated_at?: string;
  updated_by?: string | null;
  word_count?: number | null;
}

/**
 * Validation result for grant_narratives
 */
export interface GrantNarrativesValidationResult {
  valid: boolean;
  errors: {
    body?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    is_default?: string;
    name?: string;
    narrative_type?: string;
    status?: string;
    tags?: string;
    updated_at?: string;
    updated_by?: string;
    word_count?: string;
  };
}

