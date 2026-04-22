// =====================================================
// FILE: types/generated/plutus-economics/contributions.ts
// TYPE: table
// HANDLING: join_table
// GENERATED: 2026-04-22T18:15:09.734Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContributionType = Database['public']['Enums']['contribution_type'];
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

