// =====================================================
// FILE: types/generated/plutus-economics/sales.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.611Z
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

export type PaymentStatus = Database['public']['Enums']['payment_status'];
export type UserTier = Database['public']['Enums']['user_tier'];
export type SalesRow = Tables<'sales'>;
export type SalesInsert = TablesInsert<'sales'>;
export type SalesUpdate = TablesUpdate<'sales'>;

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
  created_at: string | null;
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

