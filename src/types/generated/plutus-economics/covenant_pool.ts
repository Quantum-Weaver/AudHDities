// =====================================================
// FILE: types/generated/plutus-economics/covenant_pool.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.753Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CovenantPoolRow = Tables<'covenant_pool'>;
export type CovenantPoolInsert = TablesInsert<'covenant_pool'>;
export type CovenantPoolUpdate = TablesUpdate<'covenant_pool'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of covenant_pool
 */
export interface PublicCovenantPool {
  created_at: string | null;
  created_by: string | null;
  current_balance_cents: number | null;
  id: string;
  last_distribution_at: string | null;
  pledge_percent: number;
  total_pledged_cents: number | null;
  updated_at: string | null;
  user_id: string;
}

/**
 * Form data for covenant_pool
 * All fields are optional for partial updates
 */
export interface CovenantPoolFormData {
  created_at?: string | null;
  created_by?: string | null;
  current_balance_cents?: number | null;
  id?: string;
  last_distribution_at?: string | null;
  pledge_percent?: number;
  total_pledged_cents?: number | null;
  updated_at?: string | null;
  user_id?: string;
}

