// =====================================================
// FILE: types/aethelred_connections/codex.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.650Z
// SOURCE: database.types.ts lines 858-901
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CodexRow = Database['public']['Tables']['codex']['Row'];
export type CodexInsert = Database['public']['Tables']['codex']['Insert'];
export type CodexUpdate = Database['public']['Tables']['codex']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for codex
 * All fields are optional for partial updates
 */
export interface CodexFormData {

}

/**
 * Validation result for codex
 */
export interface CodexValidationResult {
  valid: boolean;
  errors: {

  };
}

