// =====================================================
// FILE: types/aethelred_connections/vercel_connection.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.902Z
// SOURCE: database.types.ts lines 5580-5641
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type VercelConnectionRow = Database['public']['Tables']['vercel_connection']['Row'];
export type VercelConnectionInsert = Database['public']['Tables']['vercel_connection']['Insert'];
export type VercelConnectionUpdate = Database['public']['Tables']['vercel_connection']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for vercel_connection
 * All fields are optional for partial updates
 */
export interface VercelConnectionFormData {

}

/**
 * Validation result for vercel_connection
 */
export interface VercelConnectionValidationResult {
  valid: boolean;
  errors: {

  };
}

