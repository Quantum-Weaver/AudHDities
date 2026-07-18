// =====================================================
// FILE: types/generated/iris-communications/translations.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-07-18T23:17:11.189Z
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
  context: string | null;
  created_at: string;
  created_by: string | null;
  id: string;
  is_machine_translated: boolean;
  is_verified: boolean;
  language_id: string | null;
  namespace: string | null;
  source_text: string | null;
  status: ContentStatus;
  translated_text: string | null;
  translation_key: string;
  updated_at: string;
  updated_by: string | null;
  verified_at: string | null;
  verified_by: string | null;
}

/**
 * Form data for translations
 * All fields are optional for partial updates
 */
export interface TranslationsFormData {
  context?: string | null;
  created_at?: string;
  created_by?: string | null;
  id?: string;
  is_machine_translated?: boolean;
  is_verified?: boolean;
  language_id?: string | null;
  namespace?: string | null;
  source_text?: string | null;
  status?: ContentStatus;
  translated_text?: string | null;
  translation_key?: string;
  updated_at?: string;
  updated_by?: string | null;
  verified_at?: string | null;
  verified_by?: string | null;
}

/**
 * Validation result for translations
 */
export interface TranslationsValidationResult {
  valid: boolean;
  errors: {
    context?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    is_machine_translated?: string;
    is_verified?: string;
    language_id?: string;
    namespace?: string;
    source_text?: string;
    status?: string;
    translated_text?: string;
    translation_key?: string;
    updated_at?: string;
    updated_by?: string;
    verified_at?: string;
    verified_by?: string;
  };
}

