// =====================================================
// FILE: types/generated/aethelred-connections/seer.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:06:11.522Z
// SOURCE: database.types.ts lines 5517-5570
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SeerRow = Database['public']['Tables']['seer']['Row'];
export type SeerInsert = Database['public']['Tables']['seer']['Insert'];
export type SeerUpdate = Database['public']['Tables']['seer']['Update'];

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
  "last_prediction_accuracy": "number | null";
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

