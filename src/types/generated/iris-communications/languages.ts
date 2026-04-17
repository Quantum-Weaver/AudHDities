// =====================================================
// FILE: types/generated/iris-communications/languages.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T22:45:09.485Z
// SOURCE: database.types.ts lines 2892-2944
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TextDirectionType = Database['public']['Enums']['text_direction_type'];

// =====================================================
// CORE TYPES
// =====================================================

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
  created_by: string | null;
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
  created_by?: string | null;
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
    created_by?: string;
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

