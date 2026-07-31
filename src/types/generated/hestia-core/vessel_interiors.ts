// =====================================================
// FILE: types/generated/hestia-core/vessel_interiors.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-31T00:35:01.897Z
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

export type VesselInteriorsRow = Tables<'vessel_interiors'>;
export type VesselInteriorsInsert = TablesInsert<'vessel_interiors'>;
export type VesselInteriorsUpdate = TablesUpdate<'vessel_interiors'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vessel_interiors
 */
export interface PublicVesselInteriors {
  accent_color: string | null;
  active_modules: string[] | null;
  background_url: string | null;
  created_at: string;
  created_by: string | null;
  id: string;
  layout_style: string | null;
  module_positions: Json | null;
  music_url: string | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
  user_id: string;
}

/**
 * Form data for vessel_interiors
 * All fields are optional for partial updates
 */
export interface VesselInteriorsFormData {
  accent_color?: string | null;
  active_modules?: string[] | null;
  background_url?: string | null;
  created_at?: string;
  created_by?: string | null;
  id?: string;
  layout_style?: string | null;
  module_positions?: Json | null;
  music_url?: string | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
  user_id?: string;
}

/**
 * Validation result for vessel_interiors
 */
export interface VesselInteriorsValidationResult {
  valid: boolean;
  errors: {
    accent_color?: string;
    active_modules?: string;
    background_url?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    layout_style?: string;
    module_positions?: string;
    music_url?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    user_id?: string;
  };
}

