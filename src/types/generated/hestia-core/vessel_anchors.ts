// =====================================================
// FILE: types/generated/hestia-core/vessel_anchors.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T18:08:02.248Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type VesselAnchorsRow = Tables<'vessel_anchors'>;
export type VesselAnchorsInsert = TablesInsert<'vessel_anchors'>;
export type VesselAnchorsUpdate = TablesUpdate<'vessel_anchors'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vessel_anchors
 */
export interface PublicVesselAnchors {
  anchor_type: string | null;
  created_at: string;
  created_by: string;
  cue_color: string | null;
  description: string | null;
  display_order: number;
  icon_url: string | null;
  id: string;
  is_active: boolean;
  name: string;
  position: string | null;
  room_id: string | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
  visual_cue: string | null;
}

/**
 * Form data for vessel_anchors
 * All fields are optional for partial updates
 */
export interface VesselAnchorsFormData {
  anchor_type?: string | null;
  created_at?: string;
  created_by?: string;
  cue_color?: string | null;
  description?: string | null;
  display_order?: number;
  icon_url?: string | null;
  id?: string;
  is_active?: boolean;
  name?: string;
  position?: string | null;
  room_id?: string | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
  visual_cue?: string | null;
}

/**
 * Validation result for vessel_anchors
 */
export interface VesselAnchorsValidationResult {
  valid: boolean;
  errors: {
    anchor_type?: string;
    created_at?: string;
    created_by?: string;
    cue_color?: string;
    description?: string;
    display_order?: string;
    icon_url?: string;
    id?: string;
    is_active?: string;
    name?: string;
    position?: string;
    room_id?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    visual_cue?: string;
  };
}

