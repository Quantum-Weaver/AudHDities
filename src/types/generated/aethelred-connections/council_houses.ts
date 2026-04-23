// =====================================================
// FILE: types/generated/aethelred-connections/council_houses.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-23T02:14:52.740Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

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

/**
 * Validation result for council_houses
 */
export interface CouncilHousesValidationResult {
  valid: boolean;
  errors: {
    adept_quest?: string;
    color?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    display_name?: string;
    emoji?: string;
    id?: string;
    initiate_quest?: string;
    is_active?: string;
    master_quest?: string;
    name?: string;
    order_index?: string;
    primary_domain?: string;
    updated_at?: string;
  };
}

