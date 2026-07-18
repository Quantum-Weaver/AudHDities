// =====================================================
// FILE: types/generated/hestia-core/vessel_rooms.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-18T23:30:04.193Z
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

export type VesselRoomsRow = Tables<'vessel_rooms'>;
export type VesselRoomsInsert = TablesInsert<'vessel_rooms'>;
export type VesselRoomsUpdate = TablesUpdate<'vessel_rooms'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vessel_rooms
 */
export interface PublicVesselRooms {
  created_at: string;
  created_by: string;
  description: string | null;
  display_order: number;
  icon_url: string | null;
  id: string;
  is_active: boolean;
  name: string;
  room_type: string | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for vessel_rooms
 * All fields are optional for partial updates
 */
export interface VesselRoomsFormData {
  created_at?: string;
  created_by?: string;
  description?: string | null;
  display_order?: number;
  icon_url?: string | null;
  id?: string;
  is_active?: boolean;
  name?: string;
  room_type?: string | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for vessel_rooms
 */
export interface VesselRoomsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    display_order?: string;
    icon_url?: string;
    id?: string;
    is_active?: string;
    name?: string;
    room_type?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

