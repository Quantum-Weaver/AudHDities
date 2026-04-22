// =====================================================
// FILE: types/generated/aethelred-connections/seer.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.864Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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

