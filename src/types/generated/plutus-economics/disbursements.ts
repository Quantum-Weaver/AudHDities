// =====================================================
// FILE: types/generated/plutus-economics/disbursements.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-04-30T04:17:47.271Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SourcePoolType = Enums<'source_pool_type'>;
export type PayoutStatus = Enums<'payout_status'>;

export type DisbursementsRow = Tables<'disbursements'>;
export type DisbursementsInsert = TablesInsert<'disbursements'>;
export type DisbursementsUpdate = TablesUpdate<'disbursements'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of disbursements
 */
export interface PublicDisbursements {
  created_at: string | null;
  created_by: string | null;
  disbursements_id: string;
  processed_at: string | null;
  recipient_count: number;
  source_id: string;
  source_pool: SourcePoolType;
  status: PayoutStatus | null;
  total_amount_cents: number;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for disbursements
 * All fields are optional for partial updates
 */
export interface DisbursementsFormData {
  created_at?: string | null;
  created_by?: string | null;
  disbursements_id?: string;
  processed_at?: string | null;
  recipient_count?: number;
  source_id?: string;
  source_pool?: SourcePoolType;
  status?: PayoutStatus | null;
  total_amount_cents?: number;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for disbursements
 */
export interface DisbursementsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    disbursements_id?: string;
    processed_at?: string;
    recipient_count?: string;
    source_id?: string;
    source_pool?: string;
    status?: string;
    total_amount_cents?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

