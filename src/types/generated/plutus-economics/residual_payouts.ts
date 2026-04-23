// =====================================================
// FILE: types/generated/plutus-economics/residual_payouts.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-04-23T02:14:53.419Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PayoutStatus = Enums<'payout_status'>;

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

/**
 * Validation result for residual_payouts
 */
export interface ResidualPayoutsValidationResult {
  valid: boolean;
  errors: {
    amount?: string;
    calculation_note?: string;
    contributor_id?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    paid_at?: string;
    product_id?: string;
    sale_id?: string;
    status?: string;
  };
}

