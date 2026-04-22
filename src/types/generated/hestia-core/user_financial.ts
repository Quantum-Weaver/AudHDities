// =====================================================
// FILE: types/generated/hestia-core/user_financial.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.956Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PayoutMethod = Database['public']['Enums']['payout_method'];
export type PayoutFrequency = Database['public']['Enums']['payout_frequency'];
export type UserFinancialRow = Tables<'user_financial'>;
export type UserFinancialInsert = TablesInsert<'user_financial'>;
export type UserFinancialUpdate = TablesUpdate<'user_financial'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of user_financial
 * Excludes sensitive fields: stripe_account_id
 */
export interface PublicUserFinancial {
  bank_account_last4: string | null;
  bank_account_type: string | null;
  bank_routing_last4: string | null;
  created_at: string | null;
  created_by: string | null;
  crypto_addresses: Json | null;
  default_payout_method:;
  id: string;
  minimum_payout: number | null;
  payout_frequency:;
  paypal_email: string | null;
  residual_pledge_percent: number | null;
  updated_at: string | null;
}

/**
 * Form data for user_financial
 * All fields are optional for partial updates
 */
export interface UserFinancialFormData {
  bank_account_last4?: string | null;
  bank_account_type?: string | null;
  bank_routing_last4?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  crypto_addresses?: Json | null;
  id?: string;
  minimum_payout?: number | null;
  paypal_email?: string | null;
  residual_pledge_percent?: number | null;
  stripe_account_id?: string | null;
  updated_at?: string | null;
}

