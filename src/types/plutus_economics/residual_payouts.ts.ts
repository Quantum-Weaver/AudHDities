// =====================================================
/* @/types/economics/residual_payouts.ts */
// RESIDUAL_PAYOUTS - Pure Type Definitions
// No logic, no constants, just types
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM TYPES (from database)
// =====================================================

export type PayoutStatus = Database['public']['Enums']['payout_status'];

// =====================================================
// CORE ResidualPayout TYPES
// =====================================================
/**
 * Raw residual _payouts row from database
 * Matches exactly what Supabase returns
**/
export type ResidualPayoutRow = Database['public']['Tables']['residual_payouts']['Row'];

export type ResidualPayoutInsert = Database['public']['Tables']['residual_payouts']['Insert'];
export type ResidualPayoutUpdate = Database['public']['Tables']['residual_payouts']['Update'];

// =====================================================
// DERIVED TYPES (for frontend use)
// =====================================================

/**
 * Public ResidualPayout - what anyone can see
 */
export interface PublicResidualPayout {
  id: string;
  amount: number;
  status: PayoutStatus;
  paid_at: string | null;
  sale_id: string;
  product_id: string;
  created_at: string | null;  
}

/**
 * Own ResidualPayout - includes private fields
 */
export interface OwnResidualPayout extends PublicResidualPayout { 
  contributor_id: string;
  calculation_note: string | null;
}

/**
 * ResidualPayout form data (for editing)
 */
export interface ResidualPayoutFormData {
  amount: number;
  calculation_note: string | null;
  contributor_id: string;
  created_at: string | null;
  id: string;
  paid_at: string | null
  product_id: string;
  sale_id: string;
  status: PayoutStatus;
}

/**
 * ResidualPayout validation result
 */
export interface ResidualPayoutValidationResult {
  valid: boolean;
  errors: {
    id: string;
    created_at: string | null;
  };
}