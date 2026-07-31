// =====================================================
// FILE: types/generated/hephaestus-infrastructure/file_registry.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-07-31T01:03:41.100Z
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

export type FileRegistryRow = Tables<'file_registry'>;
export type FileRegistryInsert = TablesInsert<'file_registry'>;
export type FileRegistryUpdate = TablesUpdate<'file_registry'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of file_registry
 * Excludes sensitive fields: access_token
 */
export interface PublicFileRegistry {
  bucket_name: string;
  created_at: string;
  created_by: string | null;
  description: string | null;
  file_hash: string | null;
  file_size: number | null;
  id: string;
  is_public: boolean;
  mime_type: string | null;
  name: string;
  related_id: string | null;
  related_table: string | null;
  slug: string;
  status: ContentStatus;
  storage_path: string;
  updated_at: string;
  updated_by: string | null;
  uploaded_by: string | null;
}

/**
 * Form data for file_registry
 * All fields are optional for partial updates
 */
export interface FileRegistryFormData {
  access_token?: string | null;
  bucket_name?: string;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  file_hash?: string | null;
  file_size?: number | null;
  id?: string;
  is_public?: boolean;
  mime_type?: string | null;
  name?: string;
  related_id?: string | null;
  related_table?: string | null;
  slug?: string;
  status?: ContentStatus;
  storage_path?: string;
  updated_at?: string;
  updated_by?: string | null;
  uploaded_by?: string | null;
}

/**
 * Validation result for file_registry
 */
export interface FileRegistryValidationResult {
  valid: boolean;
  errors: {
    access_token?: string;
    bucket_name?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    file_hash?: string;
    file_size?: string;
    id?: string;
    is_public?: string;
    mime_type?: string;
    name?: string;
    related_id?: string;
    related_table?: string;
    slug?: string;
    status?: string;
    storage_path?: string;
    updated_at?: string;
    updated_by?: string;
    uploaded_by?: string;
  };
}

