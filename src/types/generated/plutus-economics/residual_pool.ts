// =====================================================
// FILE: types/generated/plutus-economics/residual_pool.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-04-30T15:32:13.687Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ResidualPoolRow = Tables<'residual_pool'>;
export type ResidualPoolInsert = TablesInsert<'residual_pool'>;
export type ResidualPoolUpdate = TablesUpdate<'residual_pool'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of residual_pool
 */
export interface PublicResidualPool {
  created_at: string | null;
  created_by: string | null;
  distributed_amount_cents: number | null;
  distributed_at: string | null;
  product_id: string;
  remaining_amount_cents: number | null;
  residual_pool_id: string;
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
  created_by?: string | null;
  distributed_amount_cents?: number | null;
  distributed_at?: string | null;
  product_id?: string;
  remaining_amount_cents?: number | null;
  residual_pool_id?: string;
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
    created_by?: string;
    distributed_amount_cents?: string;
    distributed_at?: string;
    product_id?: string;
    remaining_amount_cents?: string;
    residual_pool_id?: string;
    sale_id?: string;
    total_amount_cents?: string;
    updated_at?: string;
  };
}

