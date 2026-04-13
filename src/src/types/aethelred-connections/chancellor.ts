// =====================================================
// FILE: types/generated/aethelred-connections/chancellor.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T21:47:20.985Z
// SOURCE: database.types.ts lines 860-916
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

import type { Json } from 'src/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ChancellorRow = Database['public']['Tables']['chancellor']['Row'];
export type ChancellorInsert = Database['public']['Tables']['chancellor']['Insert'];
export type ChancellorUpdate = Database['public']['Tables']['chancellor']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of chancellor
 */
export interface PublicChancellor {
  created_at: string | null;
  created_by: string | null;
  fee_structure: Json | null;
  financial_audits: Json | null;
  id: string;
  last_audit_at: string | null;
  operating_budget: Json | null;
  payout_schedule: Json | null;
  reserve_fund: number | null;
  treasury_balance: number | null;
  updated_at: string | null;
}

/**
 * Form data for chancellor
 * All fields are optional for partial updates
 */
export interface ChancellorFormData {
  created_at?: string | null;
  created_by?: string | null;
  fee_structure?: Json | null;
  financial_audits?: Json | null;
  id?: string;
  last_audit_at?: string | null;
  operating_budget?: Json | null;
  payout_schedule?: Json | null;
  reserve_fund?: number | null;
  treasury_balance?: number | null;
  updated_at?: string | null;
}

/**
 * Validation result for chancellor
 */
export interface ChancellorValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    fee_structure?: string;
    financial_audits?: string;
    id?: string;
    last_audit_at?: string;
    operating_budget?: string;
    payout_schedule?: string;
    reserve_fund?: string;
    treasury_balance?: string;
    updated_at?: string;
  };
}

