// =====================================================
// FILE: types/generated/plutus-economics/payouts.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-05-01T03:24:41.691Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PayoutMethod = Enums<'payout_method'>;
export type PayoutStatus = Enums<'payout_status'>;

export type PayoutsRow = Tables<'payouts'>;
export type PayoutsInsert = TablesInsert<'payouts'>;
export type PayoutsUpdate = TablesUpdate<'payouts'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of payouts
 */
export interface PublicPayouts {
  amount_cents: number;
  completed_at: string | null;
  created_at: string | null;
  created_by: string | null;
  destination: string | null;
  disbursement_id: string;
  payout_method: PayoutMethod;
  payouts_id: string;
  recipient_id: string;
  status: PayoutStatus | null;
  stripe_transfer_id: string | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for payouts
 * All fields are optional for partial updates
 */
export interface PayoutsFormData {
  amount_cents?: number;
  completed_at?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  destination?: string | null;
  disbursement_id?: string;
  payout_method?: PayoutMethod;
  payouts_id?: string;
  recipient_id?: string;
  status?: PayoutStatus | null;
  stripe_transfer_id?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for payouts
 */
export interface PayoutsValidationResult {
  valid: boolean;
  errors: {
    amount_cents?: string;
    completed_at?: string;
    created_at?: string;
    created_by?: string;
    destination?: string;
    disbursement_id?: string;
    payout_method?: string;
    payouts_id?: string;
    recipient_id?: string;
    status?: string;
    stripe_transfer_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

