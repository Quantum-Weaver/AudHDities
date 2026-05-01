// =====================================================
// FILE: types/generated/plutus-economics/contributions.ts
// HANDLING: join_table
// DEITY: plutus-economics
// GENERATED: 2026-05-01T03:24:41.262Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContributionType = Enums<'contribution_type'>;

export type ContributionsRow = Tables<'contributions'>;
export type ContributionsInsert = TablesInsert<'contributions'>;
export type ContributionsUpdate = TablesUpdate<'contributions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for contributions
 * All fields are optional for partial updates
 */
export interface ContributionsFormData {
  contribution_type?: ContributionType;
  contributions_id?: string;
  contributor_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  is_one_time?: boolean | null;
  is_residual_eligible?: boolean | null;
  percent_share?: number;
  product_id?: string;
  updated_at?: string | null;
  updated_by?: string | null;
}

