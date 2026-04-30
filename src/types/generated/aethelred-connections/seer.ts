// =====================================================
// FILE: types/generated/aethelred-connections/seer.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T00:26:46.630Z
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
  id: string;
  insight_queue: Json | null;
  last_prediction_accuracy: number | null;
  pattern_library: Json | null;
  prophecies: Json | null;
  trend_analysis: Json | null;
  updated_at: string | null;
}

/**
 * Form data for seer
 * All fields are optional for partial updates
 */
export interface SeerFormData {
  anomaly_detection?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  insight_queue?: Json | null;
  last_prediction_accuracy?: number | null;
  pattern_library?: Json | null;
  prophecies?: Json | null;
  trend_analysis?: Json | null;
  updated_at?: string | null;
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
    id?: string;
    insight_queue?: string;
    last_prediction_accuracy?: string;
    pattern_library?: string;
    prophecies?: string;
    trend_analysis?: string;
    updated_at?: string;
  };
}

