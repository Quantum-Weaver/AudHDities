// =====================================================
// FILE: types/hestia_core/user_financial.ts
// HANDLING: full_crud
// DEITY: hestia_core
// GENERATED: 2026-04-05T21:55:13.117Z
// SOURCE: database.types.ts lines 5324-5391
// =====================================================

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

export type UserFinancialRow = Database['public']['Tables']['user_financial']['Row'];
export type UserFinancialInsert = Database['public']['Tables']['user_financial']['Insert'];
export type UserFinancialUpdate = Database['public']['Tables']['user_financial']['Update'];

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
  crypto_addresses: Json | null;
  default_payout_method: string | null;
  id: string;
  minimum_payout: number | null;
  payout_frequency: string | null;
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
  crypto_addresses?: Json | null;
  id?: string;
  minimum_payout?: number | null;
  paypal_email?: string | null;
  residual_pledge_percent?: number | null;
  stripe_account_id?: string | null;
  updated_at?: string | null;
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
    crypto_addresses?: string;
    default_payout_method?: string;
    id?: string;
    minimum_payout?: string;
    payout_frequency?: string;
    paypal_email?: string;
    residual_pledge_percent?: string;
    stripe_account_id?: string;
    updated_at?: string;
  };
}

