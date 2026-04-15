// =====================================================
// FILE: types/generated/aethelred-connections/council_houses.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T18:11:44.193Z
// SOURCE: database.types.ts lines 1471-1553
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CouncilHousesRow = Database['public']['Tables']['council_houses']['Row'];
export type CouncilHousesInsert = Database['public']['Tables']['council_houses']['Insert'];
export type CouncilHousesUpdate = Database['public']['Tables']['council_houses']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of council_houses
 */
export interface PublicCouncilHouses {
  adept_quest: string | null;
  color: string;
  "created_at": "string | null";
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
  "updated_at": "string | null";
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

