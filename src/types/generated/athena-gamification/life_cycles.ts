// =====================================================
// FILE: types/generated/athena-gamification/life_cycles.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-04-30T04:17:47.535Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type LifeCyclePhase = Enums<'life_cycle_phase'>;

export type LifeCyclesRow = Tables<'life_cycles'>;
export type LifeCyclesInsert = TablesInsert<'life_cycles'>;
export type LifeCyclesUpdate = TablesUpdate<'life_cycles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of life_cycles
 */
export interface PublicLifeCycles {
  created_at: string | null;
  created_by: string | null;
  ended_at: string | null;
  life_cycles_id: string;
  metadata: Json | null;
  phase: LifeCyclePhase;
  started_at: string;
  trigger_event: string | null;
  updated_at: string | null;
  user_id: string;
}

/**
 * Form data for life_cycles
 * All fields are optional for partial updates
 */
export interface LifeCyclesFormData {
  created_at?: string | null;
  created_by?: string | null;
  ended_at?: string | null;
  life_cycles_id?: string;
  metadata?: Json | null;
  phase?: LifeCyclePhase;
  started_at?: string;
  trigger_event?: string | null;
  updated_at?: string | null;
  user_id?: string;
}

/**
 * Validation result for life_cycles
 */
export interface LifeCyclesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    ended_at?: string;
    life_cycles_id?: string;
    metadata?: string;
    phase?: string;
    started_at?: string;
    trigger_event?: string;
    updated_at?: string;
    user_id?: string;
  };
}

