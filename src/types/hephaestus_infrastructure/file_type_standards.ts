// =====================================================
// FILE: types/hephaestus_infrastructure/file_type_standards.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T21:55:12.989Z
// SOURCE: database.types.ts lines 2092-2154
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type FileTypeStandardsRow = Database['public']['Tables']['file_type_standards']['Row'];
export type FileTypeStandardsInsert = Database['public']['Tables']['file_type_standards']['Insert'];
export type FileTypeStandardsUpdate = Database['public']['Tables']['file_type_standards']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of file_type_standards
 */
export interface PublicFileTypeStandards {
  created_at: string | null;
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

/**
 * Validation result for file_type_standards
 */
export interface FileTypeStandardsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    description?: string;
    display_name?: string;
    emoji?: string;
    example_code?: string;
    example_path?: string;
    file_type?: string;
    id?: string;
    must_handle_errors?: string;
    must_have_interfaces?: string;
    must_have_loading_state?: string;
    must_have_props?: string;
    prohibited_patterns?: string;
    required_imports?: string;
    required_patterns?: string;
    updated_at?: string;
    validation_description?: string;
    validation_query?: string;
  };
}

