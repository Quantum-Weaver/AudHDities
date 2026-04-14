// =====================================================
// FILE: types/generated/plutus-economics/residual_payouts.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T19:39:30.042Z
// SOURCE: database.types.ts lines 4987-5054
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PayoutStatus = Database['public']['Enums']['payout_status'];

// =====================================================
// CORE TYPES
// =====================================================

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
  "created_at": "string | null";
  created_by: string | null;
  id: string;
  "paid_at": "string | null";
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

