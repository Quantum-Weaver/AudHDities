// =====================================================
// FILE: types/generated/hestia-core/vessel_decorations.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-31T23:16:54.962Z
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

export type VesselDecorationsRow = Tables<'vessel_decorations'>;
export type VesselDecorationsInsert = TablesInsert<'vessel_decorations'>;
export type VesselDecorationsUpdate = TablesUpdate<'vessel_decorations'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vessel_decorations
 */
export interface PublicVesselDecorations {
  created_at: string;
  created_by: string;
  decoration_type: string | null;
  description: string | null;
  display_order: number;
  id: string;
  is_displayed: boolean;
  name: string;
  position: string | null;
  reference_id: string | null;
  room_id: string | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for vessel_decorations
 * All fields are optional for partial updates
 */
export interface VesselDecorationsFormData {
  created_at?: string;
  created_by?: string;
  decoration_type?: string | null;
  description?: string | null;
  display_order?: number;
  id?: string;
  is_displayed?: boolean;
  name?: string;
  position?: string | null;
  reference_id?: string | null;
  room_id?: string | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for vessel_decorations
 */
export interface VesselDecorationsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    decoration_type?: string;
    description?: string;
    display_order?: string;
    id?: string;
    is_displayed?: string;
    name?: string;
    position?: string;
    reference_id?: string;
    room_id?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

