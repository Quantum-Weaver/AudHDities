// =====================================================
// FILE: types/generated/mnemosyne-assessment/folksonomy.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-08-01T21:41:40.264Z
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

export type FolksonomyRow = Tables<'folksonomy'>;
export type FolksonomyInsert = TablesInsert<'folksonomy'>;
export type FolksonomyUpdate = TablesUpdate<'folksonomy'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of folksonomy
 */
export interface PublicFolksonomy {
  category: string | null;
  context_type: string | null;
  context_value: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  keyword_id: string | null;
  name: string;
  slug: string;
  sovereign_id: string | null;
  status: ContentStatus;
  thesaurus_entry_id: string | null;
  updated_at: string;
  updated_by: string | null;
  usage_count: number;
}

/**
 * Form data for folksonomy
 * All fields are optional for partial updates
 */
export interface FolksonomyFormData {
  category?: string | null;
  context_type?: string | null;
  context_value?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  keyword_id?: string | null;
  name?: string;
  slug?: string;
  sovereign_id?: string | null;
  status?: ContentStatus;
  thesaurus_entry_id?: string | null;
  updated_at?: string;
  updated_by?: string | null;
  usage_count?: number;
}

/**
 * Validation result for folksonomy
 */
export interface FolksonomyValidationResult {
  valid: boolean;
  errors: {
    category?: string;
    context_type?: string;
    context_value?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    keyword_id?: string;
    name?: string;
    slug?: string;
    sovereign_id?: string;
    status?: string;
    thesaurus_entry_id?: string;
    updated_at?: string;
    updated_by?: string;
    usage_count?: string;
  };
}

