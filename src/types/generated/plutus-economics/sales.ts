// =====================================================
// FILE: types/generated/plutus-economics/sales.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T21:18:08.854Z
// SOURCE: database.types.ts lines 5116-5206
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PaymentStatus = Database['public']['Enums']['payment_status'];
export type UserTier = Database['public']['Enums']['user_tier'];

// =====================================================
// CORE TYPES
// =====================================================

export type SalesRow = Database['public']['Tables']['sales']['Row'];
export type SalesInsert = Database['public']['Tables']['sales']['Insert'];
export type SalesUpdate = Database['public']['Tables']['sales']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of sales
 */
export interface PublicSales {
  amount_cents: number;
  bigot_tax_applied: boolean | null;
  buyer_id: string;
  "created_at": "string | null";
  created_by: string | null;
  creator_earnings_cents: number;
  gross_amount: number;
  id: string;
  nd_price_applied: boolean | null;
  net_amount: number | null;
  payment_processor_fee: number | null;
  payment_status: PaymentStatus | null;
  platform_fee_cents: number;
  product_id: string;
  stripe_payment_intent: string | null;
  stripe_session_id: string | null;
  tier_applied: UserTier;
  to_creator_immediate: number | null;
  to_infrastructure: number | null;
  to_residual_pool: number | null;
}

/**
 * Form data for sales
 * All fields are optional for partial updates
 */
export interface SalesFormData {
  amount_cents?: number;
  bigot_tax_applied?: boolean | null;
  buyer_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  creator_earnings_cents?: number;
  gross_amount?: number;
  id?: string;
  nd_price_applied?: boolean | null;
  net_amount?: number | null;
  payment_processor_fee?: number | null;
  payment_status?: PaymentStatus | null;
  platform_fee_cents?: number;
  product_id?: string;
  stripe_payment_intent?: string | null;
  stripe_session_id?: string | null;
  tier_applied?: UserTier;
  to_creator_immediate?: number | null;
  to_infrastructure?: number | null;
  to_residual_pool?: number | null;
}

/**
 * Validation result for sales
 */
export interface SalesValidationResult {
  valid: boolean;
  errors: {
    amount_cents?: string;
    bigot_tax_applied?: string;
    buyer_id?: string;
    created_at?: string;
    created_by?: string;
    creator_earnings_cents?: string;
    gross_amount?: string;
    id?: string;
    nd_price_applied?: string;
    net_amount?: string;
    payment_processor_fee?: string;
    payment_status?: string;
    platform_fee_cents?: string;
    product_id?: string;
    stripe_payment_intent?: string;
    stripe_session_id?: string;
    tier_applied?: string;
    to_creator_immediate?: string;
    to_infrastructure?: string;
    to_residual_pool?: string;
  };
}

