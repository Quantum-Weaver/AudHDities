// =====================================================
// FILE: types/aethelred_connections/archivist.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.630Z
// SOURCE: database.types.ts lines 527-570
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ArchivistRow = Database['public']['Tables']['archivist']['Row'];
export type ArchivistInsert = Database['public']['Tables']['archivist']['Insert'];
export type ArchivistUpdate = Database['public']['Tables']['archivist']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for archivist
 * All fields are optional for partial updates
 */
export interface ArchivistFormData {

}

/**
 * Validation result for archivist
 */
export interface ArchivistValidationResult {
  valid: boolean;
  errors: {

  };
}

