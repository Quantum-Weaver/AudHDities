// =====================================================
// FILE: types/aethelred_connections/resend_connection.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.812Z
// SOURCE: database.types.ts lines 3975-4034
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ResendConnectionRow = Database['public']['Tables']['resend_connection']['Row'];
export type ResendConnectionInsert = Database['public']['Tables']['resend_connection']['Insert'];
export type ResendConnectionUpdate = Database['public']['Tables']['resend_connection']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for resend_connection
 * All fields are optional for partial updates
 */
export interface ResendConnectionFormData {

}

/**
 * Validation result for resend_connection
 */
export interface ResendConnectionValidationResult {
  valid: boolean;
  errors: {

  };
}

