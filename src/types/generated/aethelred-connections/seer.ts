// =====================================================
// FILE: types/generated/aethelred-connections/seer.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T15:32:13.724Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type SeerRow = Tables<'seer'>;
export type SeerInsert = TablesInsert<'seer'>;
export type SeerUpdate = TablesUpdate<'seer'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of seer
 */
export interface PublicSeer {
  anomaly_detection: Json | null;
  created_at: string | null;
  created_by: string | null;
  insight_queue: Json | null;
  last_prediction_accuracy: number | null;
  pattern_library: Json | null;
  prophecies: Json | null;
  seer_id: string;
  trend_analysis: Json | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for seer
 * All fields are optional for partial updates
 */
export interface SeerFormData {
  anomaly_detection?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  insight_queue?: Json | null;
  last_prediction_accuracy?: number | null;
  pattern_library?: Json | null;
  prophecies?: Json | null;
  seer_id?: string;
  trend_analysis?: Json | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for seer
 */
export interface SeerValidationResult {
  valid: boolean;
  errors: {
    anomaly_detection?: string;
    created_at?: string;
    created_by?: string;
    insight_queue?: string;
    last_prediction_accuracy?: string;
    pattern_library?: string;
    prophecies?: string;
    seer_id?: string;
    trend_analysis?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

