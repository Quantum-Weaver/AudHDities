// =====================================================
// FILE: types/aethelred_connections/skald.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.845Z
// SOURCE: database.types.ts lines 4588-4631
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SkaldRow = Database['public']['Tables']['skald']['Row'];
export type SkaldInsert = Database['public']['Tables']['skald']['Insert'];
export type SkaldUpdate = Database['public']['Tables']['skald']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for skald
 * All fields are optional for partial updates
 */
export interface SkaldFormData {

}

/**
 * Validation result for skald
 */
export interface SkaldValidationResult {
  valid: boolean;
  errors: {

  };
}

