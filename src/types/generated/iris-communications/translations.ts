// =====================================================
// FILE: types/generated/iris-communications/translations.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-04-23T02:14:53.742Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TranslatableType = Enums<'translatable_type'>;

export type TranslationsRow = Tables<'translations'>;
export type TranslationsInsert = TablesInsert<'translations'>;
export type TranslationsUpdate = TablesUpdate<'translations'>;

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

