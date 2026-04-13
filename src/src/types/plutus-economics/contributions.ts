// =====================================================
// FILE: types/generated/plutus-economics/contributions.ts
// HANDLING: join_table
// GENERATED: 2026-04-13T21:47:20.972Z
// SOURCE: database.types.ts lines 1407-1470
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContributionType = Database['public']['Enums']['contribution_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type ContributionsRow = Database['public']['Tables']['contributions']['Row'];
export type ContributionsInsert = Database['public']['Tables']['contributions']['Insert'];
export type ContributionsUpdate = Database['public']['Tables']['contributions']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for contributions
 * All fields are optional for partial updates
 */
export interface ContributionsFormData {
  contribution_type?: ContributionType;
  contributor_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_one_time?: boolean | null;
  is_residual_eligible?: boolean | null;
  percent_share?: number;
  product_id?: string;
  updated_at?: string | null;
}

