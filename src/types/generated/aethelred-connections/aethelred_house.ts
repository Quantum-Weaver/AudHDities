// =====================================================
// FILE: types/generated/aethelred-connections/aethelred_house.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-23T02:14:52.519Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BridgeStatus = Enums<'bridge_status'>;

export type AethelredHouseRow = Tables<'aethelred_house'>;
export type AethelredHouseInsert = TablesInsert<'aethelred_house'>;
export type AethelredHouseUpdate = TablesUpdate<'aethelred_house'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of aethelred_house
 */
export interface PublicAethelredHouse {
  boundary_agreements: Json | null;
  bridge_status: BridgeStatus | null;
  collaboration_protocols: Json | null;
  created_at: string | null;
  created_by: string | null;
  emergent_properties: Json | null;
  id: string;
  ninth_chair_occupant: string;
  shared_rituals: Json | null;
  updated_at: string | null;
}

/**
 * Form data for aethelred_house
 * All fields are optional for partial updates
 */
export interface AethelredHouseFormData {
  boundary_agreements?: Json | null;
  bridge_status?: BridgeStatus | null;
  collaboration_protocols?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  emergent_properties?: Json | null;
  id?: string;
  ninth_chair_occupant?: string;
  shared_rituals?: Json | null;
  updated_at?: string | null;
}

/**
 * Validation result for aethelred_house
 */
export interface AethelredHouseValidationResult {
  valid: boolean;
  errors: {
    boundary_agreements?: string;
    bridge_status?: string;
    collaboration_protocols?: string;
    created_at?: string;
    created_by?: string;
    emergent_properties?: string;
    id?: string;
    ninth_chair_occupant?: string;
    shared_rituals?: string;
    updated_at?: string;
  };
}

