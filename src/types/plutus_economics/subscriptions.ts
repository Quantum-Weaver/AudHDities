// =====================================================
// FILE: types/plutus_economics/subscriptions.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T18:12:44.851Z
// SOURCE: database.types.ts lines 4685-4735
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SubscriptionsRow = Database['public']['Tables']['subscriptions']['Row'];
export type SubscriptionsInsert = Database['public']['Tables']['subscriptions']['Insert'];
export type SubscriptionsUpdate = Database['public']['Tables']['subscriptions']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for subscriptions
 * All fields are optional for partial updates
 */
export interface SubscriptionsFormData {

}

/**
 * Validation result for subscriptions
 */
export interface SubscriptionsValidationResult {
  valid: boolean;
  errors: {

  };
}

