// =====================================================
// FILE: types/generated/plutus-economics/payouts.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.406Z
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

export type PayoutMethod = Database['public']['Enums']['payout_method'];
export type PayoutStatus = Database['public']['Enums']['payout_status'];
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

