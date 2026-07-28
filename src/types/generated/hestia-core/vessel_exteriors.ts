// =====================================================
// FILE: types/generated/hestia-core/vessel_exteriors.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-28T15:33:50.086Z
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

export type VesselExteriorsRow = Tables<'vessel_exteriors'>;
export type VesselExteriorsInsert = TablesInsert<'vessel_exteriors'>;
export type VesselExteriorsUpdate = TablesUpdate<'vessel_exteriors'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vessel_exteriors
 */
export interface PublicVesselExteriors {
  accent_color: string | null;
  background_url: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  icon_url: string | null;
  id: string;
  is_limited: boolean;
  name: string;
  rarity: string | null;
  slug: string;
  status: ContentStatus;
  theme: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for vessel_exteriors
 * All fields are optional for partial updates
 */
export interface VesselExteriorsFormData {
  accent_color?: string | null;
  background_url?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  icon_url?: string | null;
  id?: string;
  is_limited?: boolean;
  name?: string;
  rarity?: string | null;
  slug?: string;
  status?: ContentStatus;
  theme?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for vessel_exteriors
 */
export interface VesselExteriorsValidationResult {
  valid: boolean;
  errors: {
    accent_color?: string;
    background_url?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    icon_url?: string;
    id?: string;
    is_limited?: string;
    name?: string;
    rarity?: string;
    slug?: string;
    status?: string;
    theme?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

