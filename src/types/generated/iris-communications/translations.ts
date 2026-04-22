// =====================================================
// FILE: types/generated/iris-communications/translations.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.934Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TranslatableType = Database['public']['Enums']['translatable_type'];
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

