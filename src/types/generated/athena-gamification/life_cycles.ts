// =====================================================
// FILE: types/generated/athena-gamification/life_cycles.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T21:18:08.831Z
// SOURCE: database.types.ts lines 2949-2999
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type LifeCyclePhase = Database['public']['Enums']['life_cycle_phase'];

// =====================================================
// CORE TYPES
// =====================================================

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
  "created_at": "string | null";
  created_by: string | null;
  "ended_at": "string | null";
  id: string;
  metadata: Json | null;
  phase: LifeCyclePhase;
  "started_at": "string";
  trigger_event: string | null;
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
    created_by?: string;
    ended_at?: string;
    id?: string;
    metadata?: string;
    phase?: string;
    started_at?: string;
    trigger_event?: string;
    user_id?: string;
  };
}

