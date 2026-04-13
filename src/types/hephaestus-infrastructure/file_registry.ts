// =====================================================
// FILE: types/generated/hephaestus-infrastructure/file_registry.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T06:13:41.734Z
// SOURCE: database.types.ts lines 2348-2424
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type FileRegistryRow = Database['public']['Tables']['file_registry']['Row'];
export type FileRegistryInsert = Database['public']['Tables']['file_registry']['Insert'];
export type FileRegistryUpdate = Database['public']['Tables']['file_registry']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of file_registry
 */
export interface PublicFileRegistry {
  category: string;
  created_at: string | null;
  created_by: string | null;
  dependencies: string[] | null;
  emoji: string;
  example_usage: string | null;
  file_name: string;
  file_path: string;
  file_type: string;
  id: string;
  is_active: boolean | null;
  last_validated: string | null;
  needs_review: boolean | null;
  purpose: string | null;
  review_notes: string | null;
  standards: string | null;
  subcategory: string | null;
  updated_at: string | null;
  used_by: string[] | null;
  warning: string | null;
}

/**
 * Form data for file_registry
 * All fields are optional for partial updates
 */
export interface FileRegistryFormData {
  category?: string;
  created_at?: string | null;
  created_by?: string | null;
  dependencies?: string[] | null;
  emoji?: string;
  example_usage?: string | null;
  file_name?: string;
  file_path?: string;
  file_type?: string;
  id?: string;
  is_active?: boolean | null;
  last_validated?: string | null;
  needs_review?: boolean | null;
  purpose?: string | null;
  review_notes?: string | null;
  standards?: string | null;
  subcategory?: string | null;
  updated_at?: string | null;
  used_by?: string[] | null;
  warning?: string | null;
}

/**
 * Validation result for file_registry
 */
export interface FileRegistryValidationResult {
  valid: boolean;
  errors: {
    category?: string;
    created_at?: string;
    created_by?: string;
    dependencies?: string;
    emoji?: string;
    example_usage?: string;
    file_name?: string;
    file_path?: string;
    file_type?: string;
    id?: string;
    is_active?: string;
    last_validated?: string;
    needs_review?: string;
    purpose?: string;
    review_notes?: string;
    standards?: string;
    subcategory?: string;
    updated_at?: string;
    used_by?: string;
    warning?: string;
  };
}

