// =====================================================
// FILE: types/generated/hestia-core/vessel_bubbles.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T18:08:02.249Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type VesselBubblesRow = Tables<'vessel_bubbles'>;
export type VesselBubblesInsert = TablesInsert<'vessel_bubbles'>;
export type VesselBubblesUpdate = TablesUpdate<'vessel_bubbles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vessel_bubbles
 */
export interface PublicVesselBubbles {
  bubble_id: string;
  collected_at: string;
  collection_context: Json | null;
  collection_method: string | null;
  created_at: string;
  id: string;
  updated_at: string;
  user_id: string;
}

/**
 * Form data for vessel_bubbles
 * All fields are optional for partial updates
 */
export interface VesselBubblesFormData {
  bubble_id?: string;
  collected_at?: string;
  collection_context?: Json | null;
  collection_method?: string | null;
  created_at?: string;
  id?: string;
  updated_at?: string;
  user_id?: string;
}

/**
 * Validation result for vessel_bubbles
 */
export interface VesselBubblesValidationResult {
  valid: boolean;
  errors: {
    bubble_id?: string;
    collected_at?: string;
    collection_context?: string;
    collection_method?: string;
    created_at?: string;
    id?: string;
    updated_at?: string;
    user_id?: string;
  };
}

