// =====================================================
// FILE: types/generated/iris-communications/localization.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.055Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type LocalizationRow = Tables<'localization'>;
export type LocalizationInsert = TablesInsert<'localization'>;
export type LocalizationUpdate = TablesUpdate<'localization'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of localization
 */
export interface PublicLocalization {
  approved_by: string | null;
  context: string | null;
  created_at: string | null;
  created_by: string | null;
  id: string;
  is_approved: boolean | null;
  language_code: string;
  plural_form: number | null;
  resource_key: string;
  translation: string;
  updated_at: string | null;
  version: number | null;
}

/**
 * Form data for localization
 * All fields are optional for partial updates
 */
export interface LocalizationFormData {
  approved_by?: string | null;
  context?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  is_approved?: boolean | null;
  language_code?: string;
  plural_form?: number | null;
  resource_key?: string;
  translation?: string;
  updated_at?: string | null;
  version?: number | null;
}

