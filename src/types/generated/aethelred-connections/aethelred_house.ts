// =====================================================
// FILE: types/generated/aethelred-connections/aethelred_house.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-05-01T15:31:59.417Z
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
  aethelred_house_id: string;
  boundary_agreements: Json | null;
  bridge_status: BridgeStatus | null;
  collaboration_protocols: Json | null;
  created_at: string | null;
  created_by: string | null;
  emergent_properties: Json | null;
  ninth_chair_occupant: string;
  shared_rituals: Json | null;
  updated_at: string | null;
}

/**
 * Form data for aethelred_house
 * All fields are optional for partial updates
 */
export interface AethelredHouseFormData {
  aethelred_house_id?: string;
  boundary_agreements?: Json | null;
  bridge_status?: BridgeStatus | null;
  collaboration_protocols?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  emergent_properties?: Json | null;
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
    aethelred_house_id?: string;
    boundary_agreements?: string;
    bridge_status?: string;
    collaboration_protocols?: string;
    created_at?: string;
    created_by?: string;
    emergent_properties?: string;
    ninth_chair_occupant?: string;
    shared_rituals?: string;
    updated_at?: string;
  };
}

