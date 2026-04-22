// =====================================================
// FILE: types/generated/hephaestus-infrastructure/file_registry.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.153Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type FileRegistryRow = Tables<'file_registry'>;
export type FileRegistryInsert = TablesInsert<'file_registry'>;
export type FileRegistryUpdate = TablesUpdate<'file_registry'>;

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

