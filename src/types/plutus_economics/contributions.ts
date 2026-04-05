// =====================================================
// FILE: types/plutus_economics/contributions.ts
// HANDLING: join_table
// DEITY: plutus_economics
// GENERATED: 2026-04-05T18:12:44.669Z
// SOURCE: database.types.ts lines 1215-1268
// =====================================================

import type { Database } from '@/types/supabase/database.types';

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

}

