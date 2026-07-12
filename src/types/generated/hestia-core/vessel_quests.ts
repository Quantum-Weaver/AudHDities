// =====================================================
// FILE: types/generated/hestia-core/vessel_quests.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.963Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type VesselQuestsRow = Tables<'vessel_quests'>;
export type VesselQuestsInsert = TablesInsert<'vessel_quests'>;
export type VesselQuestsUpdate = TablesUpdate<'vessel_quests'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vessel_quests
 */
export interface PublicVesselQuests {
  completed_at: string | null;
  created_at: string;
  id: string;
  progress_data: Json | null;
  quest_id: string;
  started_at: string | null;
  status: string;
  updated_at: string;
  user_id: string;
}

/**
 * Form data for vessel_quests
 * All fields are optional for partial updates
 */
export interface VesselQuestsFormData {
  completed_at?: string | null;
  created_at?: string;
  id?: string;
  progress_data?: Json | null;
  quest_id?: string;
  started_at?: string | null;
  status?: string;
  updated_at?: string;
  user_id?: string;
}

/**
 * Validation result for vessel_quests
 */
export interface VesselQuestsValidationResult {
  valid: boolean;
  errors: {
    completed_at?: string;
    created_at?: string;
    id?: string;
    progress_data?: string;
    quest_id?: string;
    started_at?: string;
    status?: string;
    updated_at?: string;
    user_id?: string;
  };
}

