// =====================================================
// FILE: types/plutus_economics/residual_payouts.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T21:55:13.060Z
// SOURCE: database.types.ts lines 4035-4092
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

type PayoutStatus = Database['public']['Enums']['payout_status'];

export type ResidualPayoutsRow = Database['public']['Tables']['residual_payouts']['Row'];
export type ResidualPayoutsInsert = Database['public']['Tables']['residual_payouts']['Insert'];
export type ResidualPayoutsUpdate = Database['public']['Tables']['residual_payouts']['Update'];

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
    id?: string;
    paid_at?: string;
    product_id?: string;
    sale_id?: string;
    status?: string;
  };
}

