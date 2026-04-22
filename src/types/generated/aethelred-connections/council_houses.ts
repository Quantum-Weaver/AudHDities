// =====================================================
// FILE: types/generated/aethelred-connections/council_houses.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.741Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CouncilHousesRow = Tables<'council_houses'>;
export type CouncilHousesInsert = TablesInsert<'council_houses'>;
export type CouncilHousesUpdate = TablesUpdate<'council_houses'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of council_houses
 */
export interface PublicCouncilHouses {
  adept_quest: string | null;
  color: string;
  created_at: string | null;
  created_by: string | null;
  description: string;
  display_name: string;
  emoji: string;
  id: string;
  initiate_quest: string | null;
  is_active: boolean | null;
  master_quest: string | null;
  name: string;
  order_index: number;
  primary_domain: string | null;
  updated_at: string | null;
}

/**
 * Form data for council_houses
 * All fields are optional for partial updates
 */
export interface CouncilHousesFormData {
  adept_quest?: string | null;
  color?: string;
  created_at?: string | null;
  created_by?: string | null;
  description?: string;
  display_name?: string;
  emoji?: string;
  id?: string;
  initiate_quest?: string | null;
  is_active?: boolean | null;
  master_quest?: string | null;
  name?: string;
  order_index?: number;
  primary_domain?: string | null;
  updated_at?: string | null;
}

