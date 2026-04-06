// =====================================================
// FILE: types/plutus_economics/payouts.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T21:55:13.023Z
// SOURCE: database.types.ts lines 3041-3094
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

type PayoutMethod = Database['public']['Enums']['payout_method'];
export type PayoutStatus = Database['public']['Enums']['payout_status'];

export type PayoutsRow = Database['public']['Tables']['payouts']['Row'];
export type PayoutsInsert = Database['public']['Tables']['payouts']['Insert'];
export type PayoutsUpdate = Database['public']['Tables']['payouts']['Update'];

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
  destination: string | null;
  disbursement_id: string;
  id: string;
  payout_method: PayoutMethod;
  recipient_id: string;
  status: PayoutStatus | null;
  stripe_transfer_id: string | null;
}

/**
 * Form data for payouts
 * All fields are optional for partial updates
 */
export interface PayoutsFormData {
  amount_cents?: number;
  completed_at?: string | null;
  created_at?: string | null;
  destination?: string | null;
  disbursement_id?: string;
  id?: string;
  payout_method?: PayoutMethod;
  recipient_id?: string;
  status?: PayoutStatus | null;
  stripe_transfer_id?: string | null;
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
    destination?: string;
    disbursement_id?: string;
    id?: string;
    payout_method?: string;
    recipient_id?: string;
    status?: string;
    stripe_transfer_id?: string;
  };
}

