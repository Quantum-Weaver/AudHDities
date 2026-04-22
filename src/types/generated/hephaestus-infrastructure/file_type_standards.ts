// =====================================================
// FILE: types/generated/hephaestus-infrastructure/file_type_standards.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.923Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type FileTypeStandardsRow = Tables<'file_type_standards'>;
export type FileTypeStandardsInsert = TablesInsert<'file_type_standards'>;
export type FileTypeStandardsUpdate = TablesUpdate<'file_type_standards'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of file_type_standards
 */
export interface PublicFileTypeStandards {
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  display_name: string;
  emoji: string;
  example_code: string | null;
  example_path: string | null;
  file_type: string;
  id: string;
  must_handle_errors: boolean | null;
  must_have_interfaces: boolean | null;
  must_have_loading_state: boolean | null;
  must_have_props: boolean | null;
  prohibited_patterns: string[] | null;
  required_imports: string[] | null;
  required_patterns: string[] | null;
  updated_at: string | null;
  validation_description: string | null;
  validation_query: string | null;
}

/**
 * Form data for file_type_standards
 * All fields are optional for partial updates
 */
export interface FileTypeStandardsFormData {
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  display_name?: string;
  emoji?: string;
  example_code?: string | null;
  example_path?: string | null;
  file_type?: string;
  id?: string;
  must_handle_errors?: boolean | null;
  must_have_interfaces?: boolean | null;
  must_have_loading_state?: boolean | null;
  must_have_props?: boolean | null;
  prohibited_patterns?: string[] | null;
  required_imports?: string[] | null;
  required_patterns?: string[] | null;
  updated_at?: string | null;
  validation_description?: string | null;
  validation_query?: string | null;
}

