// =====================================================
// FILE: types/generated/aethelred-connections/aethelred_house.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T17:34:19.647Z
// SOURCE: database.types.ts lines 423-476
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BridgeStatus = Database['public']['Enums']['bridge_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type AethelredHouseRow = Database['public']['Tables']['aethelred_house']['Row'];
export type AethelredHouseInsert = Database['public']['Tables']['aethelred_house']['Insert'];
export type AethelredHouseUpdate = Database['public']['Tables']['aethelred_house']['Update'];

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

