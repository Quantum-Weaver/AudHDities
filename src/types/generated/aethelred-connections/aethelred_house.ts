// =====================================================
// FILE: types/generated/aethelred-connections/aethelred_house.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:18.631Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BridgeStatus = Database['public']['Enums']['bridge_status'];
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

