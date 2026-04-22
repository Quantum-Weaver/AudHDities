// =====================================================
// FILE: types/generated/aethelred-connections/chancellor.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:18.778Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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

