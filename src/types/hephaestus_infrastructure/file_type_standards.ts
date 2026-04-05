// =====================================================
// FILE: types/hephaestus_infrastructure/file_type_standards.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T18:12:44.713Z
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
 * Form data for file_type_standards
 * All fields are optional for partial updates
 */
export interface FileTypeStandardsFormData {

}

/**
 * Validation result for file_type_standards
 */
export interface FileTypeStandardsValidationResult {
  valid: boolean;
  errors: {

  };
}

