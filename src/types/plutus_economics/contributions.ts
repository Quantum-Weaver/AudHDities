// =====================================================
// FILE: types/plutus_economics/contributions.ts
// HANDLING: join_table
// DEITY: plutus_economics
// GENERATED: 2026-04-05T21:55:12.952Z
// SOURCE: database.types.ts lines 1215-1268
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContributionType = Database['public']['Enums']['contribution_type'];

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
  description?: string | null;
  id?: string;
  is_one_time?: boolean | null;
  is_residual_eligible?: boolean | null;
  percent_share?: number;
  product_id?: string;
  updated_at?: string | null;
}

