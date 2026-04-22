// =====================================================
// FILE: types/generated/plutus-economics/residual_payouts.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.752Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PayoutStatus = Database['public']['Enums']['payout_status'];
export type ResidualPayoutsRow = Tables<'residual_payouts'>;
export type ResidualPayoutsInsert = TablesInsert<'residual_payouts'>;
export type ResidualPayoutsUpdate = TablesUpdate<'residual_payouts'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of residual_payouts
 */
export interface PublicResidualPayouts {
  amount: number;
  calculation_note: string | null;
  contributor_id: string;
  created_at: string | null;
  created_by: string | null;
  id: string;
  paid_at: string | null;
  product_id: string;
  sale_id: string;
  status: PayoutStatus | null;
}

/**
 * Form data for residual_payouts
 * All fields are optional for partial updates
 */
export interface ResidualPayoutsFormData {
  amount?: number;
  calculation_note?: string | null;
  contributor_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  paid_at?: string | null;
  product_id?: string;
  sale_id?: string;
  status?: PayoutStatus | null;
}

