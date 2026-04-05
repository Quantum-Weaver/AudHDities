// =====================================================
// FILE: types/hephaestus_infrastructure/file_registry.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T18:12:44.710Z
// SOURCE: database.types.ts lines 2015-2091
// =====================================================

import type { Database } from '@/types/supabase/database.types';

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
 * Form data for file_registry
 * All fields are optional for partial updates
 */
export interface FileRegistryFormData {

}

/**
 * Validation result for file_registry
 */
export interface FileRegistryValidationResult {
  valid: boolean;
  errors: {

  };
}

