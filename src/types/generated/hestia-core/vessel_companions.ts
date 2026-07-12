// =====================================================
// FILE: types/generated/hestia-core/vessel_companions.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.937Z
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

export type ContentStatus = Enums<'content_status'>;

export type VesselCompanionsRow = Tables<'vessel_companions'>;
export type VesselCompanionsInsert = TablesInsert<'vessel_companions'>;
export type VesselCompanionsUpdate = TablesUpdate<'vessel_companions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vessel_companions
 */
export interface PublicVesselCompanions {
  accent_color: string | null;
  animation_url: string | null;
  avatar_url: string | null;
  behaviors: Json | null;
  companion_type: string | null;
  created_at: string;
  created_by: string;
  current_room_id: string | null;
  id: string;
  is_active: boolean;
  name: string;
  personality: string | null;
  species: string | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for vessel_companions
 * All fields are optional for partial updates
 */
export interface VesselCompanionsFormData {
  accent_color?: string | null;
  animation_url?: string | null;
  avatar_url?: string | null;
  behaviors?: Json | null;
  companion_type?: string | null;
  created_at?: string;
  created_by?: string;
  current_room_id?: string | null;
  id?: string;
  is_active?: boolean;
  name?: string;
  personality?: string | null;
  species?: string | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for vessel_companions
 */
export interface VesselCompanionsValidationResult {
  valid: boolean;
  errors: {
    accent_color?: string;
    animation_url?: string;
    avatar_url?: string;
    behaviors?: string;
    companion_type?: string;
    created_at?: string;
    created_by?: string;
    current_room_id?: string;
    id?: string;
    is_active?: string;
    name?: string;
    personality?: string;
    species?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

