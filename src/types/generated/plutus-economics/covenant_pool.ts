// =====================================================
// FILE: types/generated/plutus-economics/covenant_pool.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:06:11.479Z
// SOURCE: database.types.ts lines 1554-1604
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CovenantPoolRow = Database['public']['Tables']['covenant_pool']['Row'];
export type CovenantPoolInsert = Database['public']['Tables']['covenant_pool']['Insert'];
export type CovenantPoolUpdate = Database['public']['Tables']['covenant_pool']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of covenant_pool
 */
export interface PublicCovenantPool {
  "created_at": "string | null";
  created_by: string | null;
  current_balance_cents: number | null;
  id: string;
  "last_distribution_at": "string | null";
  pledge_percent: number;
  total_pledged_cents: number | null;
  "updated_at": "string | null";
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

/**
 * Validation result for covenant_pool
 */
export interface CovenantPoolValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    current_balance_cents?: string;
    id?: string;
    last_distribution_at?: string;
    pledge_percent?: string;
    total_pledged_cents?: string;
    updated_at?: string;
    user_id?: string;
  };
}

