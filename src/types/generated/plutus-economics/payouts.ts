// =====================================================
// FILE: types/generated/plutus-economics/payouts.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T19:39:30.025Z
// SOURCE: database.types.ts lines 3536-3599
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PayoutMethod = Database['public']['Enums']['payout_method'];
export type PayoutStatus = Database['public']['Enums']['payout_status'];

// =====================================================
// CORE TYPES
// =====================================================

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
  "completed_at": "string | null";
  "created_at": "string | null";
  created_by: string | null;
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
  created_by?: string | null;
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
    created_by?: string;
    destination?: string;
    disbursement_id?: string;
    id?: string;
    payout_method?: string;
    recipient_id?: string;
    status?: string;
    stripe_transfer_id?: string;
  };
}

