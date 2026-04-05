// =====================================================
// FILE: types/athena_gamification/life_cycles.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T19:46:33.024Z
// SOURCE: database.types.ts lines 2534-2574
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type LifeCyclePhase = Database['public']['Enums']['life_cycle_phase'];

export type LifeCyclesRow = Database['public']['Tables']['life_cycles']['Row'];
export type LifeCyclesInsert = Database['public']['Tables']['life_cycles']['Insert'];
export type LifeCyclesUpdate = Database['public']['Tables']['life_cycles']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of life_cycles
 */
export interface PublicLifeCycles {
  created_at: string | null
  ended_at: string | null
  id: string
  metadata: Json | null
  phase: LifeCyclePhase
  started_at: string
  trigger_event: string | null
  user_id: string
}

/**
 * Form data for life_cycles
 * All fields are optional for partial updates
 */
export interface LifeCyclesFormData {
  created_at?: string | null;
  ended_at?: string | null;
  id?: string;
  metadata?: Json | null;
  phase?: LifeCyclePhase;
  started_at?: string;
  trigger_event?: string | null;
  user_id?: string;
}

/**
 * Validation result for life_cycles
 */
export interface LifeCyclesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    ended_at?: string;
    id?: string;
    metadata?: string;
    phase?: string;
    started_at?: string;
    trigger_event?: string;
    user_id?: string;
  };
}

