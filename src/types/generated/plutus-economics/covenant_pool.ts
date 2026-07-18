// =====================================================
// FILE: types/generated/plutus-economics/covenant_pool.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-07-18T23:17:10.719Z
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
  created_at: string;
  created_by: string | null;
  current_balance: number;
  description: string | null;
  distribution_schedule: string;
  icon_emoji: string | null;
  id: string;
  is_active: boolean;
  last_distribution_amount: number | null;
  last_distribution_at: string | null;
  last_distribution_recipients: number | null;
  name: string;
  total_contributed_lifetime: number;
  total_distributed_lifetime: number;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for covenant_pool
 * All fields are optional for partial updates
 */
export interface CovenantPoolFormData {
  created_at?: string;
  created_by?: string | null;
  current_balance?: number;
  description?: string | null;
  distribution_schedule?: string;
  icon_emoji?: string | null;
  id?: string;
  is_active?: boolean;
  last_distribution_amount?: number | null;
  last_distribution_at?: string | null;
  last_distribution_recipients?: number | null;
  name?: string;
  total_contributed_lifetime?: number;
  total_distributed_lifetime?: number;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for covenant_pool
 */
export interface CovenantPoolValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    current_balance?: string;
    description?: string;
    distribution_schedule?: string;
    icon_emoji?: string;
    id?: string;
    is_active?: string;
    last_distribution_amount?: string;
    last_distribution_at?: string;
    last_distribution_recipients?: string;
    name?: string;
    total_contributed_lifetime?: string;
    total_distributed_lifetime?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

