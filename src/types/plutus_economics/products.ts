// =====================================================
// FILE: types/plutus_economics/products.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T18:12:44.778Z
// SOURCE: database.types.ts lines 3279-3392
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ProductsRow = Database['public']['Tables']['products']['Row'];
export type ProductsInsert = Database['public']['Tables']['products']['Insert'];
export type ProductsUpdate = Database['public']['Tables']['products']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for products
 * All fields are optional for partial updates
 */
export interface ProductsFormData {

}

/**
 * Validation result for products
 */
export interface ProductsValidationResult {
  valid: boolean;
  errors: {

  };
}

