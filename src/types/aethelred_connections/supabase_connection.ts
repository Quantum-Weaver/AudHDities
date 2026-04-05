// =====================================================
// FILE: types/aethelred_connections/supabase_connection.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.854Z
// SOURCE: database.types.ts lines 4736-4800
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SupabaseConnectionRow = Database['public']['Tables']['supabase_connection']['Row'];
export type SupabaseConnectionInsert = Database['public']['Tables']['supabase_connection']['Insert'];
export type SupabaseConnectionUpdate = Database['public']['Tables']['supabase_connection']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for supabase_connection
 * All fields are optional for partial updates
 */
export interface SupabaseConnectionFormData {

}

/**
 * Validation result for supabase_connection
 */
export interface SupabaseConnectionValidationResult {
  valid: boolean;
  errors: {

  };
}

