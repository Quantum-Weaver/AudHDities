// =====================================================
// FILE: types/generated/hestia-core/user_financial.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-05-01T03:24:42.335Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PayoutMethod = Enums<'payout_method'>;
export type PayoutFrequency = Enums<'payout_frequency'>;

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
  minimum_payout: number | null;
  payout_frequency:;
  paypal_email: string | null;
  residual_pledge_percent: number | null;
  updated_at: string | null;
  user_financial_id: string;
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
  minimum_payout?: number | null;
  paypal_email?: string | null;
  residual_pledge_percent?: number | null;
  stripe_account_id?: string | null;
  updated_at?: string | null;
  user_financial_id?: string;
}

/**
 * Validation result for user_financial
 */
export interface UserFinancialValidationResult {
  valid: boolean;
  errors: {
    bank_account_last4?: string;
    bank_account_type?: string;
    bank_routing_last4?: string;
    created_at?: string;
    created_by?: string;
    crypto_addresses?: string;
    default_payout_method?: string;
    minimum_payout?: string;
    payout_frequency?: string;
    paypal_email?: string;
    residual_pledge_percent?: string;
    stripe_account_id?: string;
    updated_at?: string;
    user_financial_id?: string;
  };
}

