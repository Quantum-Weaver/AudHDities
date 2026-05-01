// =====================================================
// FILE: types/generated/aethelred-connections/chancellor.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-05-01T15:31:59.479Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ChancellorRow = Tables<'chancellor'>;
export type ChancellorInsert = TablesInsert<'chancellor'>;
export type ChancellorUpdate = TablesUpdate<'chancellor'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of chancellor
 */
export interface PublicChancellor {
  chancellor_id: string;
  created_at: string | null;
  created_by: string | null;
  fee_structure: Json | null;
  financial_audits: Json | null;
  last_audit_at: string | null;
  operating_budget: Json | null;
  payout_schedule: Json | null;
  reserve_fund: number | null;
  treasury_balance: number | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for chancellor
 * All fields are optional for partial updates
 */
export interface ChancellorFormData {
  chancellor_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  fee_structure?: Json | null;
  financial_audits?: Json | null;
  last_audit_at?: string | null;
  operating_budget?: Json | null;
  payout_schedule?: Json | null;
  reserve_fund?: number | null;
  treasury_balance?: number | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for chancellor
 */
export interface ChancellorValidationResult {
  valid: boolean;
  errors: {
    chancellor_id?: string;
    created_at?: string;
    created_by?: string;
    fee_structure?: string;
    financial_audits?: string;
    last_audit_at?: string;
    operating_budget?: string;
    payout_schedule?: string;
    reserve_fund?: string;
    treasury_balance?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

