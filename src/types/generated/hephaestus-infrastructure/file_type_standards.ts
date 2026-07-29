// =====================================================
// FILE: types/generated/hephaestus-infrastructure/file_type_standards.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-07-29T16:16:53.740Z
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
  bucket_name: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  extensions: string[] | null;
  id: string;
  max_file_size: number | null;
  mime_types: string[] | null;
  name: string;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for file_type_standards
 * All fields are optional for partial updates
 */
export interface FileTypeStandardsFormData {
  bucket_name?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  extensions?: string[] | null;
  id?: string;
  max_file_size?: number | null;
  mime_types?: string[] | null;
  name?: string;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for file_type_standards
 */
export interface FileTypeStandardsValidationResult {
  valid: boolean;
  errors: {
    bucket_name?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    extensions?: string;
    id?: string;
    max_file_size?: string;
    mime_types?: string;
    name?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

