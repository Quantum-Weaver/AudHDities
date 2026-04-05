// =====================================================
// FILE: types/aethelred_connections/stripe_connection.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.847Z
// SOURCE: database.types.ts lines 4632-4684
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type StripeConnectionRow = Database['public']['Tables']['stripe_connection']['Row'];
export type StripeConnectionInsert = Database['public']['Tables']['stripe_connection']['Insert'];
export type StripeConnectionUpdate = Database['public']['Tables']['stripe_connection']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for stripe_connection
 * All fields are optional for partial updates
 */
export interface StripeConnectionFormData {

}

/**
 * Validation result for stripe_connection
 */
export interface StripeConnectionValidationResult {
  valid: boolean;
  errors: {

  };
}

