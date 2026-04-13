// =====================================================
// FILE: types/generated/iris-communications/translations.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T06:13:41.757Z
// SOURCE: database.types.ts lines 6339-6412
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TranslatableType = Database['public']['Enums']['translatable_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type TranslationsRow = Database['public']['Tables']['translations']['Row'];
export type TranslationsInsert = Database['public']['Tables']['translations']['Insert'];
export type TranslationsUpdate = Database['public']['Tables']['translations']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of translations
 */
export interface PublicTranslations {
  approved_by: string | null;
  created_at: string | null;
  created_by: string | null;
  field_name: string;
  id: string;
  is_approved: boolean | null;
  language_id: string;
  translatable_id: string;
  translatable_type: TranslatableType;
  translation: string;
  translator_id: string | null;
  updated_at: string | null;
}

/**
 * Form data for translations
 * All fields are optional for partial updates
 */
export interface TranslationsFormData {
  approved_by?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  field_name?: string;
  id?: string;
  is_approved?: boolean | null;
  language_id?: string;
  translatable_id?: string;
  translatable_type?: TranslatableType;
  translation?: string;
  translator_id?: string | null;
  updated_at?: string | null;
}

/**
 * Validation result for translations
 */
export interface TranslationsValidationResult {
  valid: boolean;
  errors: {
    approved_by?: string;
    created_at?: string;
    created_by?: string;
    field_name?: string;
    id?: string;
    is_approved?: string;
    language_id?: string;
    translatable_id?: string;
    translatable_type?: string;
    translation?: string;
    translator_id?: string;
    updated_at?: string;
  };
}

