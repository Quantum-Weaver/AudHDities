// =====================================================
// FILE: types/aethelred_connections/curator.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.690Z
// SOURCE: database.types.ts lines 1624-1667
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CuratorRow = Database['public']['Tables']['curator']['Row'];
export type CuratorInsert = Database['public']['Tables']['curator']['Insert'];
export type CuratorUpdate = Database['public']['Tables']['curator']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for curator
 * All fields are optional for partial updates
 */
export interface CuratorFormData {

}

/**
 * Validation result for curator
 */
export interface CuratorValidationResult {
  valid: boolean;
  errors: {

  };
}

