// =====================================================
// FILE: types/generated/plutus-economics/disbursements.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.063Z
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

export type SourcePoolType = Database['public']['Enums']['source_pool_type'];
export type PayoutStatus = Database['public']['Enums']['payout_status'];
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
  id: string;
  processed_at: string | null;
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

