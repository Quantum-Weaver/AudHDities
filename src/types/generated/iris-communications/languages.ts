// =====================================================
// FILE: types/generated/iris-communications/languages.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-04-30T04:17:47.464Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TextDirectionType = Enums<'text_direction_type'>;

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
  code: string;
  code_3: string | null;
  created_at: string | null;
  created_by: string | null;
  direction: TextDirectionType | null;
  is_active: boolean | null;
  is_default: boolean | null;
  languages_id: string;
  name: string;
  native_name: string | null;
  script: string | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for languages
 * All fields are optional for partial updates
 */
export interface LanguagesFormData {
  code?: string;
  code_3?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  direction?: TextDirectionType | null;
  is_active?: boolean | null;
  is_default?: boolean | null;
  languages_id?: string;
  name?: string;
  native_name?: string | null;
  script?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for languages
 */
export interface LanguagesValidationResult {
  valid: boolean;
  errors: {
    code?: string;
    code_3?: string;
    created_at?: string;
    created_by?: string;
    direction?: string;
    is_active?: string;
    is_default?: string;
    languages_id?: string;
    name?: string;
    native_name?: string;
    script?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

