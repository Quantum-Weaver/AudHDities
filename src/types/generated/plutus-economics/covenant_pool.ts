// =====================================================
// FILE: types/generated/plutus-economics/covenant_pool.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-04-30T04:17:47.184Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

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
  covenant_pool_id: string;
  created_at: string | null;
  created_by: string | null;
  current_balance_cents: number | null;
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
  covenant_pool_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  current_balance_cents?: number | null;
  last_distribution_at?: string | null;
  pledge_percent?: number;
  total_pledged_cents?: number | null;
  updated_at?: string | null;
  user_id?: string;
}

/**
 * Validation result for covenant_pool
 */
export interface CovenantPoolValidationResult {
  valid: boolean;
  errors: {
    covenant_pool_id?: string;
    created_at?: string;
    created_by?: string;
    current_balance_cents?: string;
    last_distribution_at?: string;
    pledge_percent?: string;
    total_pledged_cents?: string;
    updated_at?: string;
    user_id?: string;
  };
}

