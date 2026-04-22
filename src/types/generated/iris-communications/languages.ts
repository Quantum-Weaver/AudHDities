// =====================================================
// FILE: types/generated/iris-communications/languages.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.981Z
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

export type TextDirectionType = Database['public']['Enums']['text_direction_type'];
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

