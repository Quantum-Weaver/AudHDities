// =====================================================
// FILE: types/generated/iris-communications/languages.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-07-18T23:09:31.299Z
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

export type LanguagesRow = Tables<'languages'>;
export type LanguagesInsert = TablesInsert<'languages'>;
export type LanguagesUpdate = TablesUpdate<'languages'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of languages
 */
export interface PublicLanguages {
  created_at: string;
  created_by: string | null;
  direction: string;
  display_order: number;
  fallback_language_id: string | null;
  icon_url: string | null;
  id: string;
  is_active: boolean;
  iso_code: string;
  iso_code_3: string | null;
  name: string;
  native_name: string | null;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for languages
 * All fields are optional for partial updates
 */
export interface LanguagesFormData {
  created_at?: string;
  created_by?: string | null;
  direction?: string;
  display_order?: number;
  fallback_language_id?: string | null;
  icon_url?: string | null;
  id?: string;
  is_active?: boolean;
  iso_code?: string;
  iso_code_3?: string | null;
  name?: string;
  native_name?: string | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for languages
 */
export interface LanguagesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    direction?: string;
    display_order?: string;
    fallback_language_id?: string;
    icon_url?: string;
    id?: string;
    is_active?: string;
    iso_code?: string;
    iso_code_3?: string;
    name?: string;
    native_name?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

