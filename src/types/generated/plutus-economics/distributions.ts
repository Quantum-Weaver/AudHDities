// =====================================================
// FILE: types/generated/plutus-economics/distributions.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-07-31T23:16:54.411Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type DistributionsRow = Tables<'distributions'>;
export type DistributionsInsert = TablesInsert<'distributions'>;
export type DistributionsUpdate = TablesUpdate<'distributions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of distributions
 */
export interface PublicDistributions {
  amount_per_recipient: number;
  created_at: string;
  created_by: string | null;
  distribution_period: string | null;
  distribution_schedule: string;
  icon_emoji: string | null;
  id: string;
  notes: string | null;
  pool_id: string;
  pool_type: string;
  recipient_count: number;
  status: string;
  total_amount: number;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for distributions
 * All fields are optional for partial updates
 */
export interface DistributionsFormData {
  amount_per_recipient?: number;
  created_at?: string;
  created_by?: string | null;
  distribution_period?: string | null;
  distribution_schedule?: string;
  icon_emoji?: string | null;
  id?: string;
  notes?: string | null;
  pool_id?: string;
  pool_type?: string;
  recipient_count?: number;
  status?: string;
  total_amount?: number;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for distributions
 */
export interface DistributionsValidationResult {
  valid: boolean;
  errors: {
    amount_per_recipient?: string;
    created_at?: string;
    created_by?: string;
    distribution_period?: string;
    distribution_schedule?: string;
    icon_emoji?: string;
    id?: string;
    notes?: string;
    pool_id?: string;
    pool_type?: string;
    recipient_count?: string;
    status?: string;
    total_amount?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

