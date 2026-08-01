// =====================================================
// FILE: types/generated/hestia-core/user_financial.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T17:46:58.459Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

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
  covenant_pool_percent: number | null;
  created_at: string;
  created_by: string | null;
  current_balance: number | null;
  icon_emoji: string | null;
  id: string;
  payout_details: Json | null;
  payout_method: string | null;
  payout_schedule: string | null;
  stripe_customer_id: string | null;
  tax_country: string | null;
  tax_id: string | null;
  tax_info: Json | null;
  total_contributions: number | null;
  total_earned: number | null;
  total_paid_out: number | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for user_financial
 * All fields are optional for partial updates
 */
export interface UserFinancialFormData {
  covenant_pool_percent?: number | null;
  created_at?: string;
  created_by?: string | null;
  current_balance?: number | null;
  icon_emoji?: string | null;
  id?: string;
  payout_details?: Json | null;
  payout_method?: string | null;
  payout_schedule?: string | null;
  stripe_account_id?: string | null;
  stripe_customer_id?: string | null;
  tax_country?: string | null;
  tax_id?: string | null;
  tax_info?: Json | null;
  total_contributions?: number | null;
  total_earned?: number | null;
  total_paid_out?: number | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for user_financial
 */
export interface UserFinancialValidationResult {
  valid: boolean;
  errors: {
    covenant_pool_percent?: string;
    created_at?: string;
    created_by?: string;
    current_balance?: string;
    icon_emoji?: string;
    id?: string;
    payout_details?: string;
    payout_method?: string;
    payout_schedule?: string;
    stripe_account_id?: string;
    stripe_customer_id?: string;
    tax_country?: string;
    tax_id?: string;
    tax_info?: string;
    total_contributions?: string;
    total_earned?: string;
    total_paid_out?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

