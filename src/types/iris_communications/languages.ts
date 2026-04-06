// =====================================================
// FILE: types/iris_communications/languages.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T21:55:12.996Z
// SOURCE: database.types.ts lines 2316-2357
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TextDirectionType = Database['public']['Enums']['text_direction_type'];

export type LanguagesRow = Database['public']['Tables']['languages']['Row'];
export type LanguagesInsert = Database['public']['Tables']['languages']['Insert'];
export type LanguagesUpdate = Database['public']['Tables']['languages']['Update'];

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
  direction: TextDirectionType | null;
  id: string;
  is_active: boolean | null;
  is_default: boolean | null;
  name: string;
  native_name: string | null;
  script: string | null;
  updated_at: string | null;
}

/**
 * Form data for languages
 * All fields are optional for partial updates
 */
export interface LanguagesFormData {
  code?: string;
  code_3?: string | null;
  created_at?: string | null;
  direction?: TextDirectionType | null;
  id?: string;
  is_active?: boolean | null;
  is_default?: boolean | null;
  name?: string;
  native_name?: string | null;
  script?: string | null;
  updated_at?: string | null;
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
    direction?: string;
    id?: string;
    is_active?: string;
    is_default?: string;
    name?: string;
    native_name?: string;
    script?: string;
    updated_at?: string;
  };
}

