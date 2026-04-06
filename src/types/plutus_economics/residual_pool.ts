// =====================================================
// FILE: types/plutus_economics/residual_pool.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T21:55:13.063Z
// SOURCE: database.types.ts lines 4093-4143
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ResidualPoolRow = Database['public']['Tables']['residual_pool']['Row'];
export type ResidualPoolInsert = Database['public']['Tables']['residual_pool']['Insert'];
export type ResidualPoolUpdate = Database['public']['Tables']['residual_pool']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of residual_pool
 */
export interface PublicResidualPool {
  created_at: string | null;
  distributed_amount_cents: number | null;
  distributed_at: string | null;
  id: string;
  product_id: string;
  remaining_amount_cents: number | null;
  sale_id: string;
  total_amount_cents: number;
  updated_at: string | null;
}

/**
 * Form data for residual_pool
 * All fields are optional for partial updates
 */
export interface ResidualPoolFormData {
  created_at?: string | null;
  distributed_amount_cents?: number | null;
  distributed_at?: string | null;
  id?: string;
  product_id?: string;
  remaining_amount_cents?: number | null;
  sale_id?: string;
  total_amount_cents?: number;
  updated_at?: string | null;
}

/**
 * Validation result for residual_pool
 */
export interface ResidualPoolValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    distributed_amount_cents?: string;
    distributed_at?: string;
    id?: string;
    product_id?: string;
    remaining_amount_cents?: string;
    sale_id?: string;
    total_amount_cents?: string;
    updated_at?: string;
  };
}

