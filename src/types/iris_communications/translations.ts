// =====================================================
// FILE: types/iris_communications/translations.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T19:46:33.166Z
// SOURCE: database.types.ts lines 5215-5278
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TranslatableType = Database['public']['Enums']['translatable_type'];

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
  approved_by: string | null
  created_at: string | null
  field_name: string
  id: string
  is_approved: boolean | null
  language_id: string
  translatable_id: string
  translatable_type: TranslatableType
  translation: string
  translator_id: string | null
  updated_at: string | null
}

/**
 * Form data for translations
 * All fields are optional for partial updates
 */
export interface TranslationsFormData {
  approved_by?: string | null;
  created_at?: string | null;
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

