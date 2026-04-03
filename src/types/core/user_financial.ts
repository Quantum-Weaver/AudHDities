// =====================================================
/* @/types/core/user_financial.ts */
// USER FINANCIAL - Pure Type Definitions
// No logic, no constants, just types
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM TYPES (from database)
// =====================================================

export type PayoutMethod = Database['public']['Enums']['payout_method'];
export type PayoutFrequency = Database['public']['Enums']['payout_frequency'];

// =====================================================
// CORE UserFinancial TYPES
// =====================================================
/**
 * Raw UserFinancial row from database
 * Matches exactly what Supabase returns
**/
export type UserFinancialRow = Database['public']['Tables']['user_financial']['Row'];

export type UserFinancialInsert = Database['public']['Tables']['user_financial']['Insert'];
export type UserFinancialUpdate = Database['public']['Tables']['user_financial']['Update'];

// =====================================================
// DERIVED TYPES (for frontend use)
// =====================================================

/**
 * UserFinancial - 
 */
export interface UserFinancial {
  id: string
  bank_account_last4: string | null;
  bank_account_type: string | null;
  bank_routing_last4: string | null;
  crypto_addresses: Json | null;
  default_payout_method: PayoutMethod;
  payout_frequency: PayoutFrequency;
  minimum_payout: number | null;
  paypal_email: string | null;
  residual_pledge_percent: number | null;
  stripe_account_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

/**
 * UserFinancial form data (for editing)
 */
export interface UserFinancialFormData {
  bank_account_last4?: string | null;
  bank_account_type?: string | null;
  bank_routing_last4?: string | null;
  crypto_addresses?: Json | null;
  default_payout_method?: PayoutMethod;
  payout_frequency?: PayoutFrequency;
  minimum_payout?: number | null;
  paypal_email?: string | null;
  residual_pledge_percent?: number | null;
  stripe_account_id?: string | null;
  created_at: string | null;
}

/**
 * UserFinancial validation result
 */
export interface UserFinancialValidationResult {
  valid: boolean;
  errors: {
    id?: string;
    default_payout_method?: PayoutMethod;
  };
}