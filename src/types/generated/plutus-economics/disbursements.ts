// =====================================================
// FILE: types/generated/plutus-economics/disbursements.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T19:39:30.010Z
// SOURCE: database.types.ts lines 2010-2053
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SourcePoolType = Database['public']['Enums']['source_pool_type'];
export type PayoutStatus = Database['public']['Enums']['payout_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type DisbursementsRow = Database['public']['Tables']['disbursements']['Row'];
export type DisbursementsInsert = Database['public']['Tables']['disbursements']['Insert'];
export type DisbursementsUpdate = Database['public']['Tables']['disbursements']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of disbursements
 */
export interface PublicDisbursements {
  "created_at": "string | null";
  created_by: string | null;
  id: string;
  "processed_at": "string | null";
  recipient_count: number;
  source_id: string;
  source_pool: SourcePoolType;
  status: PayoutStatus | null;
  total_amount_cents: number;
}

/**
 * Form data for disbursements
 * All fields are optional for partial updates
 */
export interface DisbursementsFormData {
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  processed_at?: string | null;
  recipient_count?: number;
  source_id?: string;
  source_pool?: SourcePoolType;
  status?: PayoutStatus | null;
  total_amount_cents?: number;
}

/**
 * Validation result for disbursements
 */
export interface DisbursementsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    id?: string;
    processed_at?: string;
    recipient_count?: string;
    source_id?: string;
    source_pool?: string;
    status?: string;
    total_amount_cents?: string;
  };
}

