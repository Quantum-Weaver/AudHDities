// =====================================================
// FILE: types/generated/hestia-core/vessel_collections.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-29T16:16:54.094Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type VesselCollectionsRow = Tables<'vessel_collections'>;
export type VesselCollectionsInsert = TablesInsert<'vessel_collections'>;
export type VesselCollectionsUpdate = TablesUpdate<'vessel_collections'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vessel_collections
 */
export interface PublicVesselCollections {
  collection_id: string;
  created_at: string;
  display_order: number;
  id: string;
  is_displayed: boolean;
  updated_at: string;
  user_id: string;
}

/**
 * Form data for vessel_collections
 * All fields are optional for partial updates
 */
export interface VesselCollectionsFormData {
  collection_id?: string;
  created_at?: string;
  display_order?: number;
  id?: string;
  is_displayed?: boolean;
  updated_at?: string;
  user_id?: string;
}

/**
 * Validation result for vessel_collections
 */
export interface VesselCollectionsValidationResult {
  valid: boolean;
  errors: {
    collection_id?: string;
    created_at?: string;
    display_order?: string;
    id?: string;
    is_displayed?: string;
    updated_at?: string;
    user_id?: string;
  };
}

