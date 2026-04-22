// =====================================================
// FILE: types/generated/plutus-economics/residual_pool.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.765Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

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
  created_by?: string | null;
  distributed_amount_cents?: number | null;
  distributed_at?: string | null;
  id?: string;
  product_id?: string;
  remaining_amount_cents?: number | null;
  sale_id?: string;
  total_amount_cents?: number;
  updated_at?: string | null;
}

